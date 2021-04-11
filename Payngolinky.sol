// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.6;

import "https://raw.githubusercontent.com/smartcontractkit/chainlink/master/evm-contracts/src/v0.6/ChainlinkClient.sol";

interface PangolinRouter {
    
    function swapExactAVAXForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts);
        
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    
}

interface ERC20 {
    function balanceOf(address owner) external view returns (uint);
    function transfer(address to, uint value) external returns (bool);
    function approve(address spender, uint value) external returns (bool);
}

contract Payngolinky is ChainlinkClient {
    address payable public merchant;
    address public owner;
    uint256 private thresholdAmount;
    PangolinRouter pangoRouter = PangolinRouter(0x2D99ABD9008Dc933ff5c0CD271B88309593aB921);
    uint256 public lastETHPrice;
    
    address private oracle = 0x8CcF5f0f2A45910524b8d17C32D6D1daf3302979;
    bytes32 private jobId = "9b5a941a2ae040fe8eec5a881dcdc817";
    uint256 private fee = 0.1 * 10 ** 17;

    constructor(address payable merchant_, uint256 threshold_) public {
        merchant = merchant_;
        owner = msg.sender;
        thresholdAmount = threshold_;
        setChainlinkToken(0x2F0708E5FB96fd1E9F21eAbAd06EE5F337586A02);
    }
    
    function setThreshold(uint256 threshold_) public{
        require(msg.sender == merchant);
        thresholdAmount = threshold_;
    }
    
    function requestPriceData() public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        // Set the URL to perform the GET request on
        request.add("get", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD");
        request.add("path", "RAW.ETH.USD.PRICE");
        
        int timesAmount = 10**18;
        request.addInt("times", timesAmount);
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    
    /**
     * Receive the response in the form of uint256
     */ 
    function fulfill(bytes32 _requestId, uint256 _price) public recordChainlinkFulfillment(_requestId)
    {
        lastETHPrice = _price;
    }
    
    // merchant always has control over the funds and can withdraw everything
    function withdrawAll() public {
        require(msg.sender == merchant);
        ERC20 WETH = ERC20(0xFE314b188135893A684EE997eDcb81823Ffb575B);
        ERC20 USDT = ERC20(0xaeC89D2e476a57498b2FB661d3B6667C96BbC11a);
        if(USDT.balanceOf(address(this)) > 0){
            USDT.transfer(merchant,USDT.balanceOf(address(this)));
        }
        if(WETH.balanceOf(address(this)) > 0){
            WETH.transfer(merchant,WETH.balanceOf(address(this)));
        }
    }
    
    // either the merchant triggers the swap and USDT transfer at any point
    // or the owner of the contract (service provider) performs the swap when the threshold set by the merchant is reached
    // the owner receives compensation for gas fees and a small incentive to realize swap as soon as threshold is reached
    // access is unrestricted for demonstration purposes
    function swapAndWithdraw() public {
        ERC20 WETH = ERC20(0xFE314b188135893A684EE997eDcb81823Ffb575B);
        ERC20 USDT = ERC20(0xaeC89D2e476a57498b2FB661d3B6667C96BbC11a);
        uint256 WETHBalance = WETH.balanceOf(address(this));
        // turning off access limitations for demonstration purposes
        //require(msg.sender == merchant || (msg.sender == owner && WETHBalance > thresholdAmount));
        requestPriceData();
        uint256 amountOutMin = WETHBalance*(lastETHPrice)/10**18;
        amountOutMin = amountOutMin-amountOutMin/100;
        address[] memory path = new address[](2);
        path[0] = 0xFE314b188135893A684EE997eDcb81823Ffb575B; // WETH address
        path[1] = 0xaeC89D2e476a57498b2FB661d3B6667C96BbC11a; // USDT address
        //pangoRouter.swapExactAVAXForTokens{value:address(this).balance}(amountOutMin, path, address(this), block.timestamp);
        WETH.approve(0x2D99ABD9008Dc933ff5c0CD271B88309593aB921,WETHBalance);
        pangoRouter.swapExactTokensForTokens(WETHBalance,amountOutMin, path, address(this), block.timestamp);
        uint256 USDTbalance = USDT.balanceOf(address(this));
        if(msg.sender == owner && USDTbalance > 5*10**18){
            USDT.transfer(owner,5*10**18);  // owner gets reimbursed 5$ for initiating swap
            USDT.transfer(merchant,USDTbalance-5*10**18);  // merchant gets the rest
        }
        else{
            USDT.transfer(merchant,USDTbalance);  // owner gets reimbursed 5$ for initiating swap
        }
    }
    
}
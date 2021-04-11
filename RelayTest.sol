// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.6;

//import 'https://github.com/pangolindex/exchange-contracts/blob/main/contracts/pangolin-periphery/interfaces/IPangolinRouter.sol';
//import 'https://github.com/pangolindex/exchange-contracts/blob/main/contracts/pangolin-periphery/PangolinRouter.sol';
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

contract RelayTest is ChainlinkClient {
    address payable public payee;
    address public owner;
    uint256 private thresholdAmount;
    PangolinRouter pangoRouter = PangolinRouter(0x2D99ABD9008Dc933ff5c0CD271B88309593aB921);
    uint256 public lastETHPrice;
    
    address private oracle = 0x8CcF5f0f2A45910524b8d17C32D6D1daf3302979;
    bytes32 private jobId = "9b5a941a2ae040fe8eec5a881dcdc817";
    uint256 private fee = 0.1 * 10 ** 17;

    constructor(address payable payee_, uint256 threshold_) public {
        payee = payee_;
        owner = msg.sender;
        thresholdAmount = threshold_;
        setChainlinkToken(0x2F0708E5FB96fd1E9F21eAbAd06EE5F337586A02);
    }
    
    function requestPriceData() public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        // Set the URL to perform the GET request on
        request.add("get", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD");
        request.add("path", "RAW.ETH.USD.PRICE");
        
        // Multiply the result by 1000000000000000000 to remove decimals
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
    
    function withdraw(uint256 amount) public {
        require(msg.sender == payee);
        require(amount < address(this).balance);
        payee.transfer(amount);
    }
    
    function withdrawAll() public {
        require(msg.sender == payee);
        ERC20 WETH = ERC20(0xFE314b188135893A684EE997eDcb81823Ffb575B);
        ERC20 USDT = ERC20(0xaeC89D2e476a57498b2FB661d3B6667C96BbC11a);
        if(USDT.balanceOf(address(this)) > 0){
            USDT.transfer(payee,USDT.balanceOf(address(this)));
        }
        if(WETH.balanceOf(address(this)) > 0){
            WETH.transfer(payee,WETH.balanceOf(address(this)));
        }
    }
    
    function swapBalance() public returns (uint256 price)  {
        ERC20 WETH = ERC20(0xFE314b188135893A684EE997eDcb81823Ffb575B);
        ERC20 USDT = ERC20(0xaeC89D2e476a57498b2FB661d3B6667C96BbC11a);
        require(msg.sender == payee || (msg.sender == owner && WETH.balanceOf(address(this)) > thresholdAmount));
        //msg.sender.transfer(100000000000000000);
        requestPriceData();
        uint256 amountOutMin = WETH.balanceOf(address(this))*(lastETHPrice)/10**18;
        amountOutMin = amountOutMin-amountOutMin/100;
        address[] memory path = new address[](2);
        path[0] = 0xFE314b188135893A684EE997eDcb81823Ffb575B; // WETH address
        path[1] = 0xaeC89D2e476a57498b2FB661d3B6667C96BbC11a; // USDT address
        //pangoRouter.swapExactAVAXForTokens{value:address(this).balance}(amountOutMin, path, address(this), block.timestamp);
        WETH.approve(0x2D99ABD9008Dc933ff5c0CD271B88309593aB921,WETH.balanceOf(address(this)));
        pangoRouter.swapExactTokensForTokens(WETH.balanceOf(address(this)),amountOutMin, path, address(this), block.timestamp);
        USDT.transfer(payee,USDT.balanceOf(address(this)));
        
        return lastETHPrice;
    }
    
    function getPriceData() public returns (uint256 price){
        requestPriceData();
        return lastETHPrice;
    }
    
    //fallback () external payable{
        
    //}
     //if(address(this).balance > 1e18){ // this should be 1 AVAX
        //    emit ReadyToSwap(address(this).balance);
        //}
    //receive() external payable { // this is executed after the transaction
    //    balanceOf[msg.sender] = balanceOf[msg.sender]+msg.value;
    //}
}
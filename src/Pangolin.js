import React, { Component } from 'react';
import Web3 from 'web3';
import { ethers } from 'ethers'
import { Contract } from '@ethersproject/contracts'
import { ChainId, Token, WAVAX, Fetcher, Trade, Route, TokenAmount, TradeType, Percent, Pair } from '@pangolindex/sdk'
import IPangolinPair from '@pangolindex/exchange-contracts/artifacts/contracts/pangolin-core/PangolinPair.sol/PangolinPair.json'
import IPangolinERC20 from '@pangolindex/exchange-contracts/artifacts/contracts/pangolin-core/PangolinERC20.sol/PangolinERC20.json'
import { getNetwork } from '@ethersproject/networks'
import { getDefaultProvider } from '@ethersproject/providers'
import JSBI from 'jsbi';

class Pangolin extends Component {
  /**
   * Metamask constructor initializes state variables
   * @constructor
   */

  constructor(props) {
    super(props);
    console.log('Pango initializing...');
    this.FujiRouter = '0x2D99ABD9008Dc933ff5c0CD271B88309593aB921';
    this.amountIn = '100000000000000000'; // 0.1 WAVAX to swap

    // State containing account address string and text in swap button
    this.state = {
      account: '',
      buttonText: 'You need to connect first!'
    }
    this.FujiRouterABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_factory","internalType":"address"},{"type":"address","name":"_WAVAX","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"WAVAX","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountA","internalType":"uint256"},{"type":"uint256","name":"amountB","internalType":"uint256"},{"type":"uint256","name":"liquidity","internalType":"uint256"}],"name":"addLiquidity","inputs":[{"type":"address","name":"tokenA","internalType":"address"},{"type":"address","name":"tokenB","internalType":"address"},{"type":"uint256","name":"amountADesired","internalType":"uint256"},{"type":"uint256","name":"amountBDesired","internalType":"uint256"},{"type":"uint256","name":"amountAMin","internalType":"uint256"},{"type":"uint256","name":"amountBMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"payable","outputs":[{"type":"uint256","name":"amountToken","internalType":"uint256"},{"type":"uint256","name":"amountAVAX","internalType":"uint256"},{"type":"uint256","name":"liquidity","internalType":"uint256"}],"name":"addLiquidityAVAX","inputs":[{"type":"address","name":"token","internalType":"address"},{"type":"uint256","name":"amountTokenDesired","internalType":"uint256"},{"type":"uint256","name":"amountTokenMin","internalType":"uint256"},{"type":"uint256","name":"amountAVAXMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"factory","inputs":[]},{"type":"function","stateMutability":"pure","outputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"}],"name":"getAmountIn","inputs":[{"type":"uint256","name":"amountOut","internalType":"uint256"},{"type":"uint256","name":"reserveIn","internalType":"uint256"},{"type":"uint256","name":"reserveOut","internalType":"uint256"}]},{"type":"function","stateMutability":"pure","outputs":[{"type":"uint256","name":"amountOut","internalType":"uint256"}],"name":"getAmountOut","inputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"},{"type":"uint256","name":"reserveIn","internalType":"uint256"},{"type":"uint256","name":"reserveOut","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"getAmountsIn","inputs":[{"type":"uint256","name":"amountOut","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"getAmountsOut","inputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"}]},{"type":"function","stateMutability":"pure","outputs":[{"type":"uint256","name":"amountB","internalType":"uint256"}],"name":"quote","inputs":[{"type":"uint256","name":"amountA","internalType":"uint256"},{"type":"uint256","name":"reserveA","internalType":"uint256"},{"type":"uint256","name":"reserveB","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountA","internalType":"uint256"},{"type":"uint256","name":"amountB","internalType":"uint256"}],"name":"removeLiquidity","inputs":[{"type":"address","name":"tokenA","internalType":"address"},{"type":"address","name":"tokenB","internalType":"address"},{"type":"uint256","name":"liquidity","internalType":"uint256"},{"type":"uint256","name":"amountAMin","internalType":"uint256"},{"type":"uint256","name":"amountBMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountToken","internalType":"uint256"},{"type":"uint256","name":"amountAVAX","internalType":"uint256"}],"name":"removeLiquidityAVAX","inputs":[{"type":"address","name":"token","internalType":"address"},{"type":"uint256","name":"liquidity","internalType":"uint256"},{"type":"uint256","name":"amountTokenMin","internalType":"uint256"},{"type":"uint256","name":"amountAVAXMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountAVAX","internalType":"uint256"}],"name":"removeLiquidityAVAXSupportingFeeOnTransferTokens","inputs":[{"type":"address","name":"token","internalType":"address"},{"type":"uint256","name":"liquidity","internalType":"uint256"},{"type":"uint256","name":"amountTokenMin","internalType":"uint256"},{"type":"uint256","name":"amountAVAXMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountToken","internalType":"uint256"},{"type":"uint256","name":"amountAVAX","internalType":"uint256"}],"name":"removeLiquidityAVAXWithPermit","inputs":[{"type":"address","name":"token","internalType":"address"},{"type":"uint256","name":"liquidity","internalType":"uint256"},{"type":"uint256","name":"amountTokenMin","internalType":"uint256"},{"type":"uint256","name":"amountAVAXMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"bool","name":"approveMax","internalType":"bool"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountAVAX","internalType":"uint256"}],"name":"removeLiquidityAVAXWithPermitSupportingFeeOnTransferTokens","inputs":[{"type":"address","name":"token","internalType":"address"},{"type":"uint256","name":"liquidity","internalType":"uint256"},{"type":"uint256","name":"amountTokenMin","internalType":"uint256"},{"type":"uint256","name":"amountAVAXMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"bool","name":"approveMax","internalType":"bool"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountA","internalType":"uint256"},{"type":"uint256","name":"amountB","internalType":"uint256"}],"name":"removeLiquidityWithPermit","inputs":[{"type":"address","name":"tokenA","internalType":"address"},{"type":"address","name":"tokenB","internalType":"address"},{"type":"uint256","name":"liquidity","internalType":"uint256"},{"type":"uint256","name":"amountAMin","internalType":"uint256"},{"type":"uint256","name":"amountBMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"bool","name":"approveMax","internalType":"bool"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"payable","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"swapAVAXForExactTokens","inputs":[{"type":"uint256","name":"amountOut","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"payable","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"swapExactAVAXForTokens","inputs":[{"type":"uint256","name":"amountOutMin","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"payable","outputs":[],"name":"swapExactAVAXForTokensSupportingFeeOnTransferTokens","inputs":[{"type":"uint256","name":"amountOutMin","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"swapExactTokensForAVAX","inputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"},{"type":"uint256","name":"amountOutMin","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"swapExactTokensForAVAXSupportingFeeOnTransferTokens","inputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"},{"type":"uint256","name":"amountOutMin","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"swapExactTokensForTokens","inputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"},{"type":"uint256","name":"amountOutMin","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","inputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"},{"type":"uint256","name":"amountOutMin","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"swapTokensForExactAVAX","inputs":[{"type":"uint256","name":"amountOut","internalType":"uint256"},{"type":"uint256","name":"amountInMax","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"swapTokensForExactTokens","inputs":[{"type":"uint256","name":"amountOut","internalType":"uint256"},{"type":"uint256","name":"amountInMax","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"receive","stateMutability":"payable"}];
    console.log(window.web3);
  }

  async swapAvaxToUSDT(){
    console.log('swap Avax to USDT');
    window.web3 = new Web3(window.ethereum);
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const LINK = new Token(ChainId.FUJI, window.web3.utils.toChecksumAddress('0x2f0708e5fb96fd1e9f21eabad06ee5f337586a02'), 18)
    console.log(window.web3.utils.toChecksumAddress('0x2f0708e5fb96fd1e9f21eabad06ee5f337586a02'));
    let tokenA = LINK
    let tokenB = WAVAX[LINK.chainId]
    const address = Pair.getAddress(tokenA, tokenB, tokenA.chainId)
    console.log(address)
    const [reserves0, reserves1] = await new Contract(address, IPangolinPair.abi, provider).getReserves()
    const balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0]
    console.log(balances)
    const pair = new Pair(new TokenAmount(tokenA, balances[0]), new TokenAmount(tokenB, balances[1]), tokenA.chainId)
    // note that you may want/need to handle this async code differently,
    // for example if top-level await is not an option
    //const pair = await Fetcher.fetchPairData(LINK, WAVAX[LINK.chainId])
    const route = new Route([pair], WAVAX[LINK.chainId])
    const trade = new Trade(route, new TokenAmount(WAVAX[LINK.chainId], this.amountIn), TradeType.EXACT_INPUT)
    const slippageTolerance = new Percent('50', '10000') // 50 bips, or 0.50%
    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw // needs to be converted to e.g. hex
    const path = [WAVAX[LINK.chainId].address, LINK.address]
    const to = window.web3.utils.toChecksumAddress(this.state.account) // should be a checksummed recipient address
    const deadline = Math.floor(Date.now() / 1000) + 60 * 10 // 10 minutes from the current Unix time
    const value = trade.inputAmount.raw // // needs to be converted to e.g. hex
    console.log("Mid Price WAVAX --> LINK:", route.midPrice.toSignificant(6));
    console.log("Mid Price LINK --> WAVAX:", route.midPrice.invert().toSignificant(6));
    console.log("-".repeat(45));
    console.log("Execution Price WAVAX --> LINK:", trade.executionPrice.toSignificant(6));
    console.log("Mid Price after trade WAVAX --> LINK:", trade.nextMidPrice.toSignificant(6));
    console.log(amountOutMin.toString())

    var myContract1 = new window.web3.eth.Contract(IPangolinERC20.abi, tokenB.address, {
      from: this.state.account, // default from address
    });

    var allowance = await myContract1.methods.allowance(this.state.account,this.FujiRouter).call();

    console.log('allowance is ', allowance)


    if(JSBI.lessThan(JSBI.BigInt(allowance),JSBI.BigInt(this.amountIn))){
      console.log('not enough allowance!')
      await myContract1.methods.approve(this.FujiRouter,this.amountIn).send();
      console.log('allowed now')
    }

    var myContract = new window.web3.eth.Contract(this.FujiRouterABI, this.FujiRouter, {
      from: this.state.account, // default from address
    });
    //['0xd00ae08403B9bbb9124bB305C09058E32C39A48c','0x2f0708e5fb96fd1e9f21eabad06ee5f337586a02']
    await myContract.methods.swapExactAVAXForTokens(amountOutMin.toString(),path,to,deadline).send({value:this.amountIn});
    //myContract.swapExactAVAXForTokens.call(amountOut,this.state.account,this.state.account,1000);
  }

  setupSwap = () => {
    //Sending Ethereum to an address
    // not setting any price should let it set it to default values
    // determined by network
    //let mygasPrice = 225e9;
    //let mygas = 21000;
    if (this.state.account.length > 0) {
      this.swapAvaxToUSDT()
        .then(() => window.location.reload()) // Refresh window hack so AVAX balance is updated
        .catch(error => console.error(error));
    }
  }

  /**
   * Update account address and swap button text once passed-in accounts prop is valid
   * @details https://reactjs.org/docs/react-component.html#componentdidupdate
   */
  componentDidUpdate() {
    if (this.props.accounts !== undefined
        && this.props.accounts.length > 0
        && this.props.accounts[0] !== this.state.account) {
      this.setState({
        account: this.props.accounts[0],
        buttonText: 'Swap ' + ethers.utils.formatEther(this.amountIn) + ' AVAX'
      });
    }
  }

  render() {
    return (
      <section className="mw-100 pa2 pa3-ns">
        <button
          onClick={this.setupSwap}
          className="f5 f4-m f3-l tc no-underline br-pill ba bw1 ph3 pv2 dib black pointer">
          {this.state.buttonText}
        </button>
      </section>
    );
  };

} // class Pangolin extends Component

export default Pangolin;
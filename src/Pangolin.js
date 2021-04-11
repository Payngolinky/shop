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
    this.swapContract = '0xa4d2afbCC5B4Ea597AB78AFF83004Ce5749bBc7F';
    this.swapContractABI = [{"inputs": [{"internalType": "address payable","name": "merchant_","type": "address"},{"internalType": "uint256","name": "threshold_","type": "uint256"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "bytes32","name": "id","type": "bytes32"}],"name": "ChainlinkCancelled","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "bytes32","name": "id","type": "bytes32"}],"name": "ChainlinkFulfilled","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "bytes32","name": "id","type": "bytes32"}],"name": "ChainlinkRequested","type": "event"},{"inputs": [{"internalType": "bytes32","name": "_requestId","type": "bytes32"},{"internalType": "uint256","name": "_price","type": "uint256"}],"name": "fulfill","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "lastETHPrice","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "merchant","outputs": [{"internalType": "address payable","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "requestPriceData","outputs": [{"internalType": "bytes32","name": "requestId","type": "bytes32"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "threshold_","type": "uint256"}],"name": "setThreshold","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "swapAndWithdraw","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "withdrawAll","outputs": [],"stateMutability": "nonpayable","type": "function"}];
    //console.log(window.web3);
  }

  async triggerSwap(){
    console.log('swap WETH to USDT');
    window.web3 = new Web3(window.ethereum);

    let balanceofABI = [{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"type":"function"},];
    var WETHtoken = new window.web3.eth.Contract(balanceofABI, '0xFE314b188135893A684EE997eDcb81823Ffb575B', {});

    let WETHBalance = await WETHtoken.methods.balanceOf(this.swapContract).call();

    var myContract = new window.web3.eth.Contract(this.swapContractABI, this.swapContract, {
      from: this.state.account, // default from address
    });
    if(WETHBalance > 0){
      await myContract.methods.swapAndWithdraw().send();
    }
    else{
      alert('the contract WETH Balance is 0, not enough to swap!')
    }
  }

  setupSwap = () => {
    if (this.state.account.length > 0) {
      this.triggerSwap()
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
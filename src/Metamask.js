const Web3 = require("web3");

class MetaMask {
  /**
   * Metamask constructor initializes state variables
   * @constructor
   */
  ethereum = window.ethereum;
  constructor() {
    console.log('MetaMask initializing...');
    const ethereumButton = document.querySelector('#MetaMaskButton');
    if(!this.metaMaskInstalled() && this.isMetaMask()){
      console.log('MetaMask is not installed!');
      ethereumButton.innerHTML('Install Metamask');
    }
    else{
      console.log('MetaMask is installed');
      ethereumButton.addEventListener('click', this.linkMetaMaskAccount());
    }
  }

  metaMaskInstalled(){
    return typeof window.ethereum !== 'undefined' ? true : false;
  }

  isMetaMask(){
    return window.ethereum.isMetaMask;
  }

  async linkMetaMaskAccount(){
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    this.ethereumButton.innerHTML = account;
  }



  /**
   * Render UIs for merchant and customer
   * @returns Complete UIs for merchant and customer in JSX
   */

} // class MetaMask

export default MetaMask;
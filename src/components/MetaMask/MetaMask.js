import React, { Component } from 'react';

import { OnboardingButton } from './OnboardingButton';
import MetaMaskDisplay from './MetaMaskDisplay';

class MetaMask extends Component {
  /**
   * Metamask constructor initializes state variables
   * @constructor
   */
  constructor() {
    super();
    this.state = {
      accounts: [],
      provider: null
    }

    /* this.ethereumButton = document.querySelector('#MetaMaskButton');
    this.sendEthButton = document.querySelector('#MMsendToAddress');
    this.swapAvaxButton = document.querySelector('#MMswap');
    this.account = undefined;
    if(!this.metaMaskInstalled() && this.isMetaMask()){
      console.log('MetaMask is not installed!');
      this.ethereumButton.innerHTML = 'Install Metamask';
    }
    else{
      console.log('MetaMask is installed');
      this.setupConnect();
      this.setupSend();
    } */
  }

  /**
   * Update accounts in MetaMask state
   * @param {string[]} accounts - Array containing single account address string
   */
  updateAccounts = (accounts) => {
    this.setState({accounts: accounts});
  }

  /**
   * Update provider in MetaMask state
   * @param {Object} provider - Web3Provider wrapper from window.ethereum
   */
  updateProvider = (provider) => {
    this.setState({provider: provider});
  }

  /* metaMaskInstalled(){
    return typeof window.ethereum !== 'undefined' ? true : false;
  }

  isMetaMask(){
    return window.ethereum.isMetaMask;
  }

  setupConnect(){
    this.ethereumButton.addEventListener('click', () => {this.linkMetaMaskAccount();});
    window.ethereum.on('accountsChanged', function (accounts) {
      this.account = accounts[0];
      // Time to reload your interface with accounts[0]!
      console.log('The account was changed!')
    });
    window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
  }

  handleChainChanged(chainId){
    console.log(chainId);
    let fujiHex = 43113;
    console.log(fujiHex.toString(16));
    if(chainId === '0x'+fujiHex.toString(16)){
      console.log('all good');
      return true;
    }
    else{
      this.ethereumButton.innerHTML = 'please switch to Fuji Network';
      return false;
    }
  }

  setupSend(){
    //Sending Ethereum to an address
    let myvalue = 0.05e18;
    // not setting any price should let it set it to default values
    // determined by network
    //let mygasPrice = 225e9;
    //let mygas = 21000;
    this.sendEthButton.addEventListener('click', () => {
      if(this.account !== undefined){
        window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: this.account,
              to: '0x9a57d321084F5b1ac1fCB32230a83Df9EF0AB565',
              value: '0x'+myvalue.toString(16),
              //gasPrice: '0x'+mygasPrice.toString(16),
              //gas: '0x'+mygas.toString(16),
            },
          ],
        })
        .then((txHash) => console.log(txHash))
        .catch((error) => console.error);
      }
    });
  }

  async linkMetaMaskAccount(){
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }).catch((error) => console.error);
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if(this.handleChainChanged(chainId)){
      if(accounts){
        this.account = accounts[0];
        this.ethereumButton.innerHTML = this.account;
        this.sendEthButton.innerHTML = 'Send Coins';
        this.swapAvaxButton.innerHTML = 'Swap Avax';
      }
    }
  } */

  // Some test code for retrieving account balance
  /* getBalance = async (provider, accounts) => {
    if (provider !== null && accounts.length > 0) {
      console.log("provider is not null");
      
      let balance = await provider.getBalance(accounts[0]);
      console.log("Wei: ", balance.toString());
      console.log("Ether: ", ethers.utils.formatEther(balance));
      return balance;
    } else {
      console.log("provider is null");
      return -1;
    }
  } */

  /**
   * Render MetaMask UI
   * @returns Complete MetaMask UI in JSX
   */
  render() {
    const { accounts, provider } = this.state;

    return (
      <section className="mw-100">
        <OnboardingButton
          updateAccounts={this.updateAccounts}
          updateProvider={this.updateProvider}
        />

        <MetaMaskDisplay
          accounts={accounts}
          provider={provider}
        />
      </section>
    );
  }

} // class MetaMask extends Component

export default MetaMask;
class MetaMask {
  /**
   * Metamask constructor initializes state variables
   * @constructor
   */

  constructor() {
    console.log('MetaMask initializing...');
    this.ethereumButton = document.querySelector('#MetaMaskButton');
    this.sendEthButton = document.querySelector('#MMsendToAddress');
    if(!this.metaMaskInstalled() && this.isMetaMask()){
      console.log('MetaMask is not installed!');
      this.ethereumButton.innerHTML('Install Metamask');
    }
    else{
      console.log('MetaMask is installed');
      this.setupConnect();
      this.setupSend();
    }
  }

  metaMaskInstalled(){
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
  }

  setupSend(){
    //Sending Ethereum to an address
    let myvalue = 0.05e18;
    let mygasPrice = 470e9;
    let mygas = 21000;
    this.sendEthButton.addEventListener('click', () => {
      window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: this.account,
            to: '0x9a57d321084F5b1ac1fCB32230a83Df9EF0AB565',
            value: myvalue.toString(16),
            gasPrice: mygasPrice.toString(16),
            gas: mygas.toString(16),
          },
        ],
      })
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error);
    });
  }

  async linkMetaMaskAccount(){
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }).catch((error) => console.error);
    if(accounts){
      this.account = accounts[0];
      this.ethereumButton.innerHTML = this.account;
      this.sendEthButton.innerHTML = 'Send Coins';
    }
  }



  /**
   * Render UIs for merchant and customer
   * @returns Complete UIs for merchant and customer in JSX
   */

} // class MetaMask

export default MetaMask;
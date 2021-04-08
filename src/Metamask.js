class MetaMask {
  /**
   * Metamask constructor initializes state variables
   * @constructor
   */

  constructor() {
    console.log('MetaMask initializing...');
    this.ethereumButton = document.querySelector('#MetaMaskButton');
    this.sendEthButton = document.querySelector('#MMsendToAddress');
    this.account = undefined;
    if(!this.metaMaskInstalled() && this.isMetaMask()){
      console.log('MetaMask is not installed!');
      this.ethereumButton.innerHTML = 'Install Metamask';
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
      }
    }
  }



  /**
   * Render UIs for merchant and customer
   * @returns Complete UIs for merchant and customer in JSX
   */

} // class MetaMask

export default MetaMask;
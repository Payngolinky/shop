import React, { Component } from 'react';

import { OnboardingButton } from '../MetaMask/OnboardingButton';
import PaymentButton from '../PaymentButton/PaymentButton';

/**
 * Defines MetaMask UI on customer-side
 */
class MetaMaskCustomer extends Component {
  /**
   * MetaMaskCustomer constructor initializes state variables
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      provider: null
    }
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

  /**
   * Get destination address for customer payment
   * @returns Destination address for customer payment
   */
  getDestinationAddress = () => {
    // This is Jeff's Payngolinky wallet
    // TODO: this.props.toAddress should ultimately be returned since
    //       it is passed from the merchant-side to the customer-side
    if (this.props.toAddress.length > 0) {
      return '0x9833ba6f8816779506fCeB200b49bD78693e5Ca7';
    }
  }

  /**
   * Render customer-side MetaMask UI
   */
  render() {
    const { accounts, provider } = this.state;

    return (
      <section className="mw-100">
        <OnboardingButton
          updateAccounts={this.updateAccounts}
          updateProvider={this.updateProvider}
        />

        <PaymentButton
          product={this.props.product}
          toAddress={this.getDestinationAddress()}
          accounts={accounts}
          provider={provider}
        />
      </section>
    );
  }

} // class MetaMaskCustomer extends Component

export default MetaMaskCustomer;
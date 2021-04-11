import React, { useEffect, useState } from 'react';

import { ethers } from 'ethers';

// String constants for button text
const OOS_TEXT = 'Product out-of-stock';
const BUY_TEXT = 'Buy Now for ';

/**
 * Defines customer-side payment button UI
 * @param {Object} product - JSON object containing product details
 * @param {string} toAddress - Destination address for customer payment
 * @param {string[]} accounts - Array containing single customer account address string
 * @param {Object} provider - Web3Provider provider wrapper
 * @returns Customer payment button UI in JSX
 */
const PaymentButton = ({ product, toAddress, accounts, provider }) => {
  const [buttonText, setButtonText] = useState(OOS_TEXT);
  const [isDisabled, setDisabled] = useState(true);
  const [account, setAccount] = useState('');
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    if (toAddress !== undefined
        && toAddress.length > 0
        && accounts !== undefined
        && accounts.length > 0
        && provider !== null) {
      // Payment destination address is valid AND customer has valid account
      // Thus, product can be purchased so enable button and update account
      setButtonText(BUY_TEXT + Number(product.price).toFixed(4) + ' ETH');
      setDisabled(false);
      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    } else {
      // Product cannot be bought, display fake out-of-stock message and disable
      if (buttonText !== OOS_TEXT) {
        setButtonText(OOS_TEXT);
      }
      if (!isDisabled) {
        setDisabled(true);
      }
    }
  }, [product, toAddress, accounts, provider, buttonText, isDisabled]);

  /**
   * Logic to send customer payment - only available if button enabled
   */
  const buyProduct = async () => {
    if (provider === null || signer === null || account.length === 0) {
      return;
    }

    // WETH token contract address (FUJI), Felix minted WETH and put in pangolin
    // https://discord.com/channels/@me/825792183822057514/830589445236981780
    const wethAddress = '0xFE314b188135893A684EE997eDcb81823Ffb575B';

    // The ERC-20 Contract ABI
    // Taken from https://docs.ethers.io/v5/getting-started/#getting-started--contracts
    const wethAbi = [
      // Some details about the token
      "function name() view returns (string)",
      "function symbol() view returns (string)",

      // Send some of your tokens to someone else
      "function transfer(address to, uint amount)",

      // An event triggered whenever anyone transfers to someone else
      "event Transfer(address indexed from, address indexed to, uint amount)"
    ];

    // Create Contract object
    const wethContract = new ethers.Contract(wethAddress, wethAbi, provider);

    // Connect to a Signer to pay
    const wethWithSigner = wethContract.connect(signer);

    // Specify amount to pay from product prop
    const payAmount = ethers.utils.parseEther(Number(product.price).toFixed(4));

    // Pay amount to destination
    const tx = wethWithSigner.transfer(toAddress, payAmount);
    return tx;
    /* const tx = signer.sendTransaction({
      to: toAddress,
      value: productPrice
    }); */
  }

  /**
   * This should trigger sending the payment to the merchant
   */
  const onClick = () => {
    buyProduct()
      .then(_tx => {
        alert("Payment successful! Product will be shipped within 24 hrs.");
      })
      .catch(console.error);
  }

  return (
    <section className="mw-100 pa3 pa4-ns">
      <button
        disabled={isDisabled}
        onClick={onClick}
        className="f5 f4-m f3-l tc no-underline br-pill ba bw1 ph3 pv2 dib black pointer">
        {buttonText}
      </button>
    </section>
  );

} // const PaymentButton = ...

export default PaymentButton;
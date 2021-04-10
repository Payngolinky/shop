import React, { useCallback, useEffect } from 'react';

import { ethers } from 'ethers';

/**
 * Convert number to a string with specified precision
 * @param {number} num - BigNumber or Number to convert to a string
 * @param {number} precision - Number indicating precision to display
 * @returns String version of number with given precision
 */
const stringWithPrecision = (num = 0, precision = 4) => {
  if (ethers.BigNumber.isBigNumber(num)) {
    return num.dp(precision).toString(10);
  }
  return Number(num).toFixed(precision).toString();
}

/**
 * String constant representing a balance of 0.0000 (four decimal places)
 */
const zeroBalance = stringWithPrecision();

/**
 * Displays the balance of a token in MetaMask wallet
 * @param {string} symbol - String containing symbol of token
 * @param {string} address - String containing token contract address
 * @param {string} balance - String containing token balance to display
 * @param {TokenBalance~updateBalance} updateBalance - Callback function to update token balance in parent component
 * @param {string[]} accounts - Array containing single account address string
 * @param {Object} provider - Web3Provider provider wrapper
 * @returns UI containing balance of a token in JSX
 */
const TokenBalance = ({ symbol, address, balance, updateBalance, accounts, provider }) => {
  /**
   * Retrieve token balance and update states
   */
  const evaluateBalance = useCallback(async () => {
    if (symbol === undefined ||
        symbol.length === 0 ||
        address === undefined ||
        (address.length === 0 && symbol !== 'AVAX') ||
        balance === undefined ||
        balance.length === 0 ||
        accounts === undefined ||
        accounts.length === 0 ||
        provider === null) {
      // Balance defaults to zero
      return;
    }

    try {
      // Initialize variable that will store retrieved balance
      let tokenBalance = zeroBalance;

      if (symbol === 'AVAX') {
        // *** Get AVAX balance separately due to unknown token address ***
        tokenBalance = await provider.getBalance(accounts[0]);
      } else {
        // *** Get MetaMask balance of other tokens using token address ***

        // ERC-20 Contract ABI
        // Following code taken from https://docs.ethers.io/v5/getting-started/
        const tokenABI = [
          // Some details about the token
          "function name() view returns (string)",
          "function symbol() view returns (string)",

          // Get the account balance
          "function balanceOf(address) view returns (uint)",
        ];

        // Create contract object for token and retrieve balance
        const contract = new ethers.Contract(address, tokenABI, provider);
        tokenBalance = await contract.balanceOf(accounts[0]);

      } // else -> if (symbol === 'AVAX')
      
      if (tokenBalance !== balance) {
        // Balance has changed from previous state so update parent state
        const balanceNum = Number(ethers.utils.formatEther(tokenBalance));
        const balanceStr = stringWithPrecision(balanceNum);
        updateBalance(symbol, balanceStr);
      }
    } catch (error) {
      // Balance defaults to zero
      console.error(error);
    }
  }, [symbol, address, balance, updateBalance, accounts, provider]);

  useEffect(() => { evaluateBalance(); }, [evaluateBalance]);

  return (
    <li
      key={symbol}
      className="pa1 pa2-ns bb b--black-10">
      <b className="db f3 mb1 tc">
        {balance}
      </b>
      <span className="f5 db lh-copy tc">
        {symbol}
      </span>
    </li>
  );

}; // const TokenBalance = ...

export default TokenBalance;
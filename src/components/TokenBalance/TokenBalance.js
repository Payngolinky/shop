import React, { useCallback, useEffect, useState } from 'react';

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
 * @param {Object} provider - Web3Provider provider wrapper
 * @returns UI containing balance of a token in JSX
 */
const TokenBalance = ({ symbol, address, provider }) => {
  const [currentBalance, setCurrentBalance] = useState(zeroBalance);

  /**
   * Retrieve token balance and update states
   */
  const evaluateBalance = useCallback(async () => {
    if (symbol === undefined ||
        symbol.length === 0 ||
        address === undefined ||
        (address.length === 0 && symbol !== 'AVAX') ||
        provider === null) {
      // Balance defaults to zero
      return;
    }

    // Define addresses that Felix used
    const fbAccountAddress = '0xC6721042d28377c74f36f03755b95b3D0B5bA8C1';
    const fbContractAddress = '0xa4d2afbCC5B4Ea597AB78AFF83004Ce5749bBc7F';

    try {
      // Initialize variable that will store retrieved balance
      let tokenBalance = zeroBalance;

      // Define ERC-20 Contract ABI here since it is used twice below
      // Following code taken from https://docs.ethers.io/v5/getting-started/
      const tokenABI = [
        // Some details about the token
        "function name() view returns (string)",
        "function symbol() view returns (string)",

        // Get the account balance
        "function balanceOf(address) view returns (uint)",
      ];

      if (symbol === 'AVAX') {
        // *** Get AVAX balance separately due to unknown token address ***

        // Get AVAX balance from Felix's account
        tokenBalance = await provider.getBalance(fbAccountAddress);

      } else if (symbol.substring(0, 8) === 'CONTRACT') {
        // *** Get CONTRACT token balance using token address ***

        // Create contract for CONTRACT token and retrieve balance from Felix's contract address
        const contract = new ethers.Contract(address, tokenABI, provider);
        tokenBalance = await contract.balanceOf(fbContractAddress);

      } else {
        // *** Get MetaMask balance of other tokens using token address ***

        // Create contract object for token and retrieve balance from Felix's account address
        const contract = new ethers.Contract(address, tokenABI, provider);
        tokenBalance = await contract.balanceOf(fbAccountAddress);

      } // else -> if (symbol === 'AVAX')

      // Balance has changed from previous state so update state
      if (tokenBalance !== currentBalance) {
        const balanceNum = Number(ethers.utils.formatEther(tokenBalance));
        const balanceStr = stringWithPrecision(balanceNum);
        setCurrentBalance(balanceStr);
      }
    } catch (error) {
      // Balance defaults to zero
      console.error(error);
    }
  }, [symbol, address, currentBalance, provider]);

  useEffect(() => { evaluateBalance(); }, [evaluateBalance]);

  return (
    <li
      key={symbol}
      className="pa1 pa2-ns bb b--black-10">
      <b className="db f3 mb1 tc">
        {currentBalance}
      </b>
      <span className="f5 db lh-copy tc">
        {symbol}
      </span>
    </li>
  );

}; // const TokenBalance = ...

export default TokenBalance;
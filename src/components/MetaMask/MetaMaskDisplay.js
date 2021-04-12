import React, { useCallback, useEffect, useState } from 'react';

import NetworkData from './NetworkData';
import TokenBalanceList from '../TokenBalance/TokenBalanceList';

/**
 * Retrieve account address as a truncated string
 * @param {string[]} accounts - Array containing single account address string
 * @returns String containing truncated account address
 */
const getShortAddress = (accounts) => {
  if (accounts.length === 0) {
    return "Unavailable";
  } else {
    const address = accounts[0];
    return address.substring(0, 6)
      + "..."
      + address.substring(address.length - 4);
  }
}

/**
 * Display for MetaMask wallet data
 * @param {string[]} accounts - Array containing single account address string
 * @param {Object} provider - Web3Provider provider wrapper
 */
const MetaMaskDisplay = ({ accounts, provider }) => {
  const [chainData, setChainData] = useState("Unavailable");

  /**
   * Get chainName (optional) and chainId as a string
   */
  const getChainData = useCallback(async () => {
    if (provider === null) {
      // If web3Provider is null, default to Unavailable
      return;
    }

    try {
      // This took a long time to figure out, need to use ".provider.request"
      // https://docs.ethers.io/v5/api/providers/other/#Web3Provider
      const chainId = await provider.provider.request({
        method: 'eth_chainId'
      });

      // Create variable to store chainId and/or chainName
      let newChainData;

      if (chainId === NetworkData.AVAX_CCHAIN_TESTNET_PARAMS.chainId) {
        // Combine Avalanche testnet chainName and chainId
        newChainData = NetworkData.AVAX_CCHAIN_TESTNET_PARAMS.chainName
          + ", " + NetworkData.AVAX_CCHAIN_TESTNET_PARAMS.chainId;
      } else if (chainId === NetworkData.AVAX_CCHAIN_MAINNET_PARAMS.chainId) {
        // Combine Avalanche mainnet chainName and chainId
        newChainData = NetworkData.AVAX_CCHAIN_MAINNET_PARAMS.chainName
          + ", " + NetworkData.AVAX_CCHAIN_MAINNET_PARAMS.chainId;
      } else {
        // Otherwise, just use chainId
        newChainData = chainId;
      }

      // If chain data changed, update state
      if (newChainData !== chainData) {
        setChainData(newChainData);
      }
    } catch (error) {
      console.error(error);
    }
  }, [chainData, provider]);

  useEffect(() => { getChainData(); }, [getChainData]);

  return (
    <section className="mw-100">
      <ul className="list pl0">
        {/* Display chain info */}
        <li className="pa1 pa2-ns bb b--black-10">
          <b className="db f3 mb1 tc">Chain</b>
          <span className="f5 db lh-copy tc">{ chainData }</span>
        </li>

        {/* Display account/wallet address */}
        <li className="pa1 pa2-ns bb b--black-10">
          <b className="db f3 mb1 tc">Account Address</b>
          <span className="f5 db lh-copy tc">
            { getShortAddress(accounts) }
          </span>
        </li>

        {/* Display token balances in Felix's wallet and contract */}
        <TokenBalanceList provider={provider} />
      </ul>
    </section>
  );
} // const MetaMaskDisplay = ...

export default MetaMaskDisplay;
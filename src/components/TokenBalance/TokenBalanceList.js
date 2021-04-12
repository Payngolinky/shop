import React, { useCallback, useState } from 'react';

import TokenBalance from './TokenBalance';
import TokenData from './TokenData';

/**
 * String constant representing a balance of 0.0000
 */
const zeroBalance = '0.0000';

/**
 * Array containing default (zero) balances for each token in TokenData
 */
let defaultBalances = {};
TokenData.forEach(data => {
  defaultBalances[data.symbol] = zeroBalance;
});

/**
 * Displays the balances of selected tokens in MetaMask wallet
 * @param {Object} provider - Web3Provider provider wrapper
 * @returns Multiple TokenBalance UI elements, each displaying a token balance
 */
const TokenBalanceList = ({ provider }) => {
  // Balance strings of selected tokens in MetaMask Wallet
  const [tokenBalances, setTokenBalances] = useState(defaultBalances);

  /**
   * Update tokenBalances if changed for input token given by symbol
   * @param {string} symbol - String containing token name
   * @param {string} balance - New balance for given token
   */
  const updateBalance = useCallback((symbol, balance) => {
    // Copy current state for all tokens in tokenBalances before updating it
    let copiedBalances = { ...tokenBalances };

    // Balance has changed so update state
    if (balance !== copiedBalances[symbol]) {
      // Update copiedBalances with given inputs
      copiedBalances[symbol] = balance;

      // Finally, update tokenBalances
      setTokenBalances(copiedBalances);
    }
  }, [tokenBalances]);

  return (
    <div>
      {
        TokenData.map(data => {
          return (
            <TokenBalance
              key={data.symbol + '_' + data.chainId}
              symbol={data.symbol}
              address={data.address}
              balance={tokenBalances[data.symbol]}
              updateBalance={updateBalance}
              provider={provider}
            />
          );
        })
      }
    </div>
  );

} // const TokenBalanceList = ...

export default TokenBalanceList;
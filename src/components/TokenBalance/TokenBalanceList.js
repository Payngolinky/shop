import React from 'react';

import TokenBalance from './TokenBalance';
import TokenData from './TokenData';

/**
 * Displays the balances of selected tokens in Felix's MetaMask wallet/contract
 * @param {Object} provider - Web3Provider provider wrapper
 * @returns Multiple TokenBalance UI elements, each displaying a token balance
 */
const TokenBalanceList = ({ provider }) => {
  return (
    <div>
      {
        TokenData.map(data => {
          return (
            <TokenBalance
              key={data.symbol + '_' + data.chainId}
              symbol={data.symbol}
              address={data.address}
              provider={provider}
            />
          );
        })
      }
    </div>
  );

} // const TokenBalanceList = ...

export default TokenBalanceList;
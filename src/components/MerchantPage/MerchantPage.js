import React from 'react';

import './MerchantPage.css';
import MetaMask from '../MetaMask/MetaMask';
import ProductGrid from '../Products/ProductGrid';
import SampleProducts from '../Products/SampleProducts';

/**
 * Defines merchant UI containing wallet and inventory
 * @param {MerchantPage~updateToAddress} updateToAddress - Callback to update state in parent component
 * @returns Merchant UI in JSX
 */
const MerchantPage = ({ updateToAddress }) => {
  return (
    <article className="cf h-100">
      {/* Wallet on left-hand side (page top for small screens) */}
      <div className="fl w-100 w-25-l h-100 pa3">
        <MetaMask updateToAddress={updateToAddress} />
      </div>

      {/* Inventory on right-hand side (page bottom for small screens) */}
      <div className="fl w-100 w-75-l bt b--light-gray bl-l bg-inventory">
        <h1 className="f3 f2-m f1-l tc">
          Manage Inventory
        </h1>
        <ProductGrid products={SampleProducts} />
      </div>
    </article>
  );
} // const MerchantPage = ...

export default MerchantPage;
import React from 'react';

import ProductGrid from '../Products/ProductGrid';
import SampleProducts from '../Products/SampleProducts';

/**
 * Defines merchant UI containing wallet and inventory
 * @returns Merchant UI in JSX
 */
const MerchantPage = () => {
  return (
    <article className="cf">
      {/* Wallet on left-hand side (page top for small screens) */}
      <div className="fl w-100 w-25-l h5 vh-100-l bg-light-blue tc pa3">
        <h1>Todo: Insert Metamask Wallet UI Here</h1>
      </div>

      {/* Inventory on right-hand side (page bottom for small screens) */}
      <div className="fl w-100 w-75-l bt b--light-gray bl-l">
        <h1 className="f3 f2-m f1-l pa3 pa4-ns">
          Manage Inventory
        </h1>
        <ProductGrid products={SampleProducts} />
      </div>
    </article>
  );
} // const MerchantPage = ...

export default MerchantPage;
import React from 'react';

import Footer from '../Footer/Footer';
import MetaMaskCustomer from '../MetaMaskCustomer/MetaMaskCustomer';
import ProductDescription from './ProductDescription';
import ProductImageLayout from './ProductImageLayout';
import SampleProducts from '../Products/SampleProducts';

// Get JSON object containing product details
const product = SampleProducts[0];

/**
 * Defines customer UI containing product description and payment info
 * @param {string} toAddress - Destination address for customer payment
 * @returns Customer UI in JSX
 */
const CustomerPage = ({ toAddress }) => {
  return (
    <div>
      <article className="cf h-100">
        {/* Product images on left-hand side (page top for small screens) */}
        <div className="fl w-100 w-50-m w-75-l">
          <ProductImageLayout product={product} />
        </div>

        {/* Payment UI on right-hand side (page bottom for small screens) */}
        <div className="fl w-100 w-50-m w-25-l h-100 pa3">
          <ProductDescription product={product} />

          <MetaMaskCustomer toAddress={toAddress} />
        </div>
      </article>

      {/* Footer with social media links */}
      <Footer />
    </div>
  );
}

export default CustomerPage;
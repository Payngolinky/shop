import React from 'react';

import ProductCard from './ProductCard';

/**
 * Defines UI for a grid of product cards
 * @param {Object[]} products - Array of products to populate the grid with
 * @returns Grid of product cards in JSX
 */
const ProductGrid = ({products}) => {
  return (
    <section className="cf">
      {
        products.map(product => {
          return (
            <div key={product.id} className="fl w-100 w-50-m w-25-l pa3 pa4-l">
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image_url={product.image_url}
                qty={product.qty}
                desc={product.desc}
              />
            </div>
          );
        })
      }
    </section>
  );
} // const ProductGrid = ...

export default ProductGrid;
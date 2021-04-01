import React from 'react';

/**
 * Defines UI for a single product card
 * @param {number} id - Product ID
 * @param {string} name - Name of product
 * @param {number} price - Price of product (in AVAX)
 * @param {string} image_url - Product image URL
 * @param {string} desc - Brief description of product
 * @returns Single product card in JSX
 */
const ProductCard = ({id, name, price, image_url, desc}) => {
  return (
    <article className="link dim pointer br2 ba dark-gray b--black-10 shadow-3 mv4 w-100 mw5 center">
      <img
        src={image_url}
        className="db w-100 br2 br--top"
        alt={"Product: " + name} />

      <div className="pa2 ph3-ns h4 pb3-ns">
        <div className="dt w-100 mt1">
          <div className="dtc">
            <h1 className="f5 f4-ns mv0">{name}</h1>
          </div>
          <div className="dtc tr">
            <h2 className="f5 mv0">{Number(price).toFixed(3)} AVAX</h2>
          </div>
        </div>

        <p className="f6 lh-copy measure mt2 mid-gray">ID {id}: {desc}</p>
      </div>
    </article>
  );
} // const ProductCard = ...

export default ProductCard;
import React from 'react';

/**
 * Defines responsive layout for product images (in customer UI)
 * @param {Object} product - JSON object containing product details
 * @returns Layout of product images that adapts to screen sizes
 */
const ProductImageLayout = ({ product }) => {
  return (
    <div>
      <img
        className="db w-100"
        src="https://ih1.redbubble.net/image.2210792579.3669/rco,womens_premium_t_shirt,womens,x1770,fafafa:ca443f4786,front-c,170,40,1000,1000-bg,f8f8f8.jpg"
        alt={product.desc}
      />

      {/* Smaller product images below main image */}
      <div className="flex flex-column flex-row-l pb0 pb3-ns">
        <div className="w-100 w-third-l">
          <img
            className="db w-100"
            src="https://ih1.redbubble.net/preview/rco,womens_premium_t_shirt,womens,x550,fafafa:ca443f4786,back-c,0,0,400,400-bg,f8f8f8.jpg"
            alt="Back side of premium scoop t-shirt"
          />
        </div>
        <div className="w-100 w-third-l">
          <img
            className="db w-100"
            src="https://ih1.redbubble.net/image.2210792579.3669/raf,400x400,075,t,fafafa:ca443f4786.jpg"
            alt="T-Shirt logo"
          />
        </div>
        <div className="w-100 w-third-l">
          <img
            className="db w-100"
            src="https://ih1.redbubble.net/image.2210792482.3669/ra,fitted_scoop,x600,322e3f:696a94a5d4,front-c,0,0,400,400-bg,f8f8f8.jpg"
            alt="Premium scoop t-shirt alternate color"
          />
        </div>
      </div>
    </div>
  );

} // const ProductImageLayout = ...

export default ProductImageLayout;
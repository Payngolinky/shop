import React from 'react';

/**
 * Defines layout for product description (in customer UI)
 * @param {Object} product - JSON object containing product details
 * @returns Layout of product description
 */
const ProductDescription = ({ product }) => {
  return (
    <div>
      <h1 className="f3 f2-ns lh-title tc tl-ns pl3-ns mb2 mb3-ns">{product.desc} T-Shirt</h1>
      <h1 className="f6 f5-ns lh-copy tc tl-ns pl3-ns mb3 mb4-ns">
        Designed and sold by <a href="https://www.redbubble.com/people/hyggekrog/shop" className="link underline-hover red">kyggekrog</a>
      </h1>

      <h1 className="f4 f3-ns lh-copy tc tl-ns pl3-ns mb3 mb4-ns">
        {Number(product.price).toFixed(4)} ETH
      </h1>

      <h1 className="f5 f4-ns lh-copy tc tl-ns pl3-ns">Features</h1>
      <ul className="f6 f5-ns lh-copy tl measure pb3 pb4-ns">
        <li>Perfect for AVAX HODLers. Few.</li>
        <li>Luxe fashion tee with scoop neck, curved hem, cap sleeves, and larger double-layer print, beautifully packaged for gifting</li>
        <li>Regular fit</li>
        <li>Model shown is 5'8.5" / 174 cm tall and wearing size small</li>
        <li>Midweight 4.4 oz. / 150 gsm fabric. Solid color t-shirts are 100% cotton. Heathered and marled fabrics are 85% cotton/15% polyester.</li>
        <li>Taped shoulder seams, double-needle hems, and self-fabric neck bind for maximum durability</li>
        <li>Printed on ethically sourced, high quality AS Colour tees</li>
        <li>Preshrunk and includes a wash bag to keep your t-shirt looking great</li>
      </ul>
    </div>
  );

} // const ProductDescription = ...

export default ProductDescription;
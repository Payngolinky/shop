import React from 'react';
import './Navbar.css';

import logo from './payngolinky-200x1000.png';

/**
 * Defines navigation bar UI
 * @callback routeCallback
 * @param {string} route String containing current route
 * @param {routeCallback} onRouteChange Callback function handling route change 
 * @returns UI for navigation bar in JSX
 */
const Navbar = ({ route, onRouteChange }) => {
  return (
    <nav className="dt w-100 border-box pa3 ph5-ns">
      <a
        className="dtc v-mid mid-gray link w-50 w-30-l"
        href="https://payngolinky.github.io/shop/"
        title="Payngolinky Home">
        <img
          src={logo}
          className="dib h2"
          alt="Payngolinky Logo" />
      </a>
      <div className="dtc v-mid w-50 w-70-l tr">
        {
          route === 'merchant'
          ? <p
              onClick={() => onRouteChange('customer')}
              className="link pointer white dim f6 f5-ns b tr dib">
              Customer View
            </p>
          : <p
              onClick={() => onRouteChange('merchant')}
              className="link pointer white dim f6 f5-ns b tr dib">
              Merchant View
            </p>
        }
      </div>
    </nav>
  );

} // const Navbar = ...

export default Navbar;
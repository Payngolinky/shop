import React, { Component } from 'react';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import MerchantPage from './components/MerchantPage/MerchantPage';

class App extends Component {
  /**
   * App constructor initializes state variables
   * @constructor
   */
  constructor() {
    super();
    this.state = {
      route: 'merchant'
    }
  }

  /**
   * Update the current state on a route change
   * @param {string} route - Desired route UI should display
   */
  onRouteChange = (route) => {
    this.setState({route: route});
  }

  /**
   * Render UIs for merchant and customer
   * @returns Complete UIs for merchant and customer in JSX
   */
  render() {
    return (
      <div className="App">
        {/* Top navigation bar common to all pages */}
        <Navbar route={this.state.route} onRouteChange={this.onRouteChange} />

        {
          this.state.route === 'merchant'
          ? <MerchantPage />
          : <div></div>
        }
      </div>
    );
  }

} // class App extends Component

export default App;

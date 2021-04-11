# Payngolinky

Payngolinky is a next-generation e-commerce payment solution that solves the core issue of
cryptocurrency market volatility for merchants who desire to move beyond traditional fiat 
payment systems that are slow and can be subject to crippling inflation.

Merchants are unwilling to accept cryptocurrencies as a form of payment due to the risk of their 
assets fluctuating in value significantly. Payngolinky alleviates their exposure by converting 
the customer's cryptocurrency payments (currently Ethereum) into Tether, whose value is anchored 
to the price of stable national currencies.

This is achieved by swapping Ethereum for Tether on the Pangolin decentralized exchange when an 
optimal pairing is detected. The Pangolin exchange is used since it is built upon the lightning
fast Avalanche framework. Chainlink is integrated to determine the optimal swapping price.

Payngolinky also offers a seamless payment experience for customers who are eager to spend their 
favorite cryptocurrencies. The popular browser wallet extension MetaMask is integrated, enabling 
quick access to assets and security through signed transactions.

## Project Installation

In a terminal, run:

### `$ git clone https://github.com/Payngolinky/shop.git`

This will create a folder named `shop` with the project files.\
Change directory into this folder with `$ cd shop`

This project requires [nodeJS](https://nodejs.org/en/) to be installed.

### `$ npm install`

This command will install all required modules for Payngolinky to run.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run deploy`

Builds the app for production and deploys to the github site, https://payngolinky.github.io/shop/

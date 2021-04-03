import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Pangolin from './Pangolin'
import reportWebVitals from './reportWebVitals';

import 'tachyons';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const png = new Pangolin(mm);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './assets/style/loader.scss';
import "./assets/style/index.scss";
import 'bootstrap/dist/css/bootstrap.css';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	window.config = window.configDev;
} 
else {
  window.config = window.configProd;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';

import CartContextProvider from "./contexts/cartContext";

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartContextProvider>
      <App />
    </CartContextProvider>
  </React.StrictMode>
);

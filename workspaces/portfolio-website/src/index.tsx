import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { JsonRpcProvider } from 'ethers/providers';
import './global.css';

let provider = new JsonRpcProvider("http://localhost:8545");

createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <App provider={provider} />
  </React.StrictMode>
);

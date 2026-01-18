import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// Initialize the root application element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application within React's StrictMode and BrowserRouter
// StrictMode activates additional checks and warnings for descendants.
// BrowserRouter enables client-side routing.
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

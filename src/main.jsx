import React from 'react';
import ReactDOM from 'react-dom/client'; // التغيير هنا
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // التغيير هنا
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

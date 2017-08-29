import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <div className="application">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </div>,
document.getElementById('root'));
registerServiceWorker();

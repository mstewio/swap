import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);
registerServiceWorker();

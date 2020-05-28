import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline'

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>
  </React.Fragment>,
  rootElement);
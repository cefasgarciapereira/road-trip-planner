import React from 'react';
import ReactDOM from 'react-dom';
import './global.css';
import App from './Pages/App';
import {TripProvider} from './contexts/trip'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <TripProvider>
      <App />
      <ToastContainer />
    </TripProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

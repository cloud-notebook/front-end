import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


const root = ReactDOM.createRoot(document.getElementById('root'));
// let persistor = persistStore(store);


root.render(
  <BrowserRouter>
    <ToastContainer />
    <Provider store={store}>
      {/*<PersistGate persistor={persistor}>*/}
        <App />
      {/*</PersistGate>*/}
    </Provider>
  </BrowserRouter>
);

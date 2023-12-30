import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import DoutorReducer from './Features/DoutorSlice';
import EnfermeiraReducer from './Features/EnfermeiraSlice';
import DoadorReducer from './Features/DoadorSlice';
import CirurgiaReducer from "./Features/CirurgiaSlice";
import CamasReducer from "./Features/CamaSlice";
import authReducer, { loadUser } from './Features/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    camas : CamasReducer,
    cirurgias : CirurgiaReducer,
    doutores: DoutorReducer,
    doador: DoadorReducer,
    enfermeiras: EnfermeiraReducer
  }
});

store.dispatch(loadUser(null));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

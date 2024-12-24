import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import DoutorReducer from './Features/DoutorSlice';
import EnfermeiraReducer from './Features/EnfermeiraSlice';
import FarmaciaReducer from './Features/FarmaciaSlice';
import DoadorReducer from './Features/DoadorSlice';
import SurgeryReducer from './Features/SurgerySlice.ts';
import CamasReducer from './Features/CamaSlice';
import PacientesReducer from './Features/PacientesSlice';
import authReducer, { loadUser } from './Features/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    camas: CamasReducer,
    surgerys: SurgeryReducer,
    doutores: DoutorReducer,
    doador: DoadorReducer,
    enfermeiras: EnfermeiraReducer,
    farmacia: FarmaciaReducer,
    pacientes: PacientesReducer
  }
});

store.dispatch(loadUser(null));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

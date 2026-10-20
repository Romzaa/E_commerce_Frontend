import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css';
import App from './App';
import { StoreProvider } from './context/storecontext';
import { AdminProvider } from './context/adminContext';
import { LoginProvider } from './context/loginContext';
import { RegisterProvider } from './context/registerContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <BrowserRouter>
            <AdminProvider>
                <LoginProvider>
                    <RegisterProvider>
                        <StoreProvider>
                            <App />
                        </StoreProvider >
                    </RegisterProvider>
                </LoginProvider >
            </AdminProvider>
        </BrowserRouter>
    </>
);

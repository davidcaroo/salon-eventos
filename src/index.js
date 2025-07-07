import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Estilos globales
import App from './App';
import { ToastContainer } from 'react-toastify'; // Para notificaciones
import 'react-toastify/dist/ReactToastify.css'; // Estilos de react-toastify
import 'react-datepicker/dist/react-datepicker.css'; // Estilos de react-datepicker
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Estilos de react-responsive-carousel

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
  </React.StrictMode>
);
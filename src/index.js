import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';


// Replace ReactDOM.render with ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById('root')).render(<App />);


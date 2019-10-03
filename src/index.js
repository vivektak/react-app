import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import $ from 'jquery/dist/jquery.js';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-table/dist/bootstrap-table.js';
// import 'bootstrap-table/dist/bootstrap-table-locale-all.js';
// import 'bootstrap-table/dist/bootstrap-table-vue.js';
// import 'bootstrap-table/dist/bootstrap-table-vue.esm.js'
// import 'bootstrap-table/dist/bootstrap-table.css';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
//https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css;
//https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap4.min.css;

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { userContext } from "./services/Context";
import "@material/react-chips/dist/chips.css";
import '@material/react-material-icon/dist/material-icon.css';



ReactDOM.render(

    <BrowserRouter>
        <ToastContainer />

        <App />

    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

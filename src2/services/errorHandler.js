import React from 'react';
import axios from 'axios';
import { error } from '../services/notificationService';
import localStorage from './../../src/services/storageService';
import { Redirect } from 'react-router';

function errorResponseHandler(err) {
    console.log(err)
    // const expectedError = err.response && err.response.status >= 400 && err.response.status < 500;
    // console.log(props)
    // console.log(expectedError)
    //if (expectedError) {
    error(err.response.data.message)

    //     if (err.response.status === 401) {
    //         error(err.response.data.message)
    //         // localStorage.removeItem('token');
    //         // return <Redirect to="/login" />
    //     }else{

    //     }
    // //}
    return Promise.reject(err);
}

// apply interceptor on response
axios.interceptors.response.use(
    response => response,
    errorResponseHandler
);

export default errorResponseHandler;
import React from 'react';
import axios from 'axios';
import { error } from '../services/notificationService';
import localStorage from './../../src/services/storageService';
import { Redirect } from 'react-router';

function errorResponseHandler(err) {
    if (err.response === undefined) {
        error('Please Check your internet Connection')
    } else {

        error(err.response.data.message)
    }
    // const expectedError = err.response && err.response.status >= 400 && err.response.status < 500;
    // console.log(props)
    // console.log(expectedError)
    //if (expectedError) {

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
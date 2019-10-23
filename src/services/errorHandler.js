import axios from 'axios';
import { error } from '../services/notificationService';

function errorResponseHandler(err) {
    console.log(err)
    if (err.response === undefined) {
        error('Please Check your internet Connection')
    } else if (err.response.data.message === 'Location already available with this name' || err.response.data.message === 'Skill already available with this name') {

    } else if (err.response.data.message === 'Unauthorised Access') {
        error('Session Timeout');
    } else {
        error(err.response.data.message);
    }
    return Promise.reject(err);
}

axios.interceptors.response.use(
    response => response,
    errorResponseHandler
);

export default errorResponseHandler;
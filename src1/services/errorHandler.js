// import axios from 'axios'
// import { toast } from 'react-toastify';

// function errorResponseHandler(error) {
//     const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

//     if (!expectedError) {
//         toast.error(error.response.data.message)
//     } else {
//         toast.error(error.response.data.message)
//     }
//     return Promise.reject(error);
// }

// // apply interceptor on response
// axios.interceptors.response.use(
//     response => response,
//     errorResponseHandler
// );

// export default errorResponseHandler;
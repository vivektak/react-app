import Axios from 'axios';
import localStorage from './storageService';
import * as Constants from '../Constants/Constants';




// const getHeaders = () => {
//     return localStorage.get(Constants.TOKEN)
// }

const http = {
    getWithHeader: async function (url) {
        const headers = {
            token: localStorage.get(Constants.TOKEN)
        }

        return await Axios.get(process.env.REACT_APP_API_URL + url, { headers })
    },

    deleteWithHeader: async function (url) {
        const headers = {
            token: localStorage.get(Constants.TOKEN)
        }
        return await Axios.delete(process.env.REACT_APP_API_URL + url, { headers })
    },

    post: async function (url, data) {
        return await Axios.post(process.env.REACT_APP_API_URL + url, data);
    },
    postWithHeader: async function (url, data) {
        const headers = {
            token: localStorage.get(Constants.TOKEN)
        }
        return await Axios.post(process.env.REACT_APP_API_URL + url, data, { headers });
    },
    putWithHeader: async function (url, data) {
        const headers = {
            token: localStorage.get(Constants.TOKEN)
        }
        return await Axios.put(process.env.REACT_APP_API_URL + url, data, { headers });
    },
    patchWithHeader: async function (url, data) {
        const headers = {
            token: localStorage.get(Constants.TOKEN)
        }
        return await Axios.patch(process.env.REACT_APP_API_URL + url, data, { headers });
    }
}

export default http;

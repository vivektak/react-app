import Axios from 'axios';

const http = {
    getWithHeader: async function (url, headers) {
        return await Axios.get(process.env.REACT_APP_API_URL + url, headers)
    },

    deleteWithHeader: async function (url, headers) {
        return await Axios.delete(process.env.REACT_APP_API_URL + url, headers)
    },

    post: async function (url, data) {
        return await Axios.post(process.env.REACT_APP_API_URL + url, data);
    },
    postWithHeader: async function (url, data, headers) {
        return await Axios.post(process.env.REACT_APP_API_URL + url, data, headers);
    },
    putWithHeader: async function (url, data, headers) {
        return await Axios.put(process.env.REACT_APP_API_URL + url, data, headers);
    },
    patchWithHeader: async function (url, data, headers) {
        return await Axios.patch(process.env.REACT_APP_API_URL + url, data, headers);
    }
}

export default http;

import ls from 'local-storage';

const localStorage = {
    get: function (key) {
        const data = ls.get(key);
        return data;
    },

    set: function (key, value) {
        ls.set(key, value);
    },

    removeItem: function (key) {
        ls.removeItem(key);
    }
}

export default localStorage;
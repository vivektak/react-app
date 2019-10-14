import http from './httpService';

export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const getUserInfo = () => {
    http.getWithHeader('user/info').then(res => {
        console.log(res)
        return res.data.data;
    })
}
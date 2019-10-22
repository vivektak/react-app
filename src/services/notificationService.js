import Alert from 'react-s-alert';

export const success = (msg) => {
    Alert.success(msg, {
        position: "top-right",
        effect: "bouncyflip",
        beep: false,
        timeout: 2000
    });
}

export const error = (msg) => {
    Alert.error(msg, {
        position: "top-right",
        effect: "bouncyflip",
        beep: false,
        timeout: 2000
    });
}

export const info = (msg) => {
    Alert.info(msg, {
        position: "top-right",
        effect: "bouncyflip",
        beep: false,
        timeout: 2000
    });
}
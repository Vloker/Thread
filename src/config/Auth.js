// config/Auth.js
export const BASE_URL = 'https://forum-api.dicoding.dev/v1';

function getAccessToken() {
    return localStorage.getItem('accessToken');
}

function setAccessToken(token) {
    localStorage.setItem('accessToken', token);
}

export { 
    getAccessToken,
    setAccessToken,
};

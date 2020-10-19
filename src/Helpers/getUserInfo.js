import jwt_decode from 'jwt-decode';

export function getUserInfo() {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
        return jwt_decode(accessToken);
    }
}
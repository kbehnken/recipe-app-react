import jwt_decode from 'jwt-decode';

export function isLoggedIn() {
    let accessToken = '';
    let tokenExp = '';

    if ('accessToken' in localStorage) {
        accessToken = localStorage.getItem('accessToken');
        tokenExp = jwt_decode(accessToken).exp;
    } else {
        return false;
    }
    if (tokenExp * 1000 <= Date.now()) {
        return false;
    }
    return true;
}


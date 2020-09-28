import jwt_decode from 'jwt-decode';
import store from './../Redux/store';

export function isLoggedIn() {
    let accessToken = '';
    let tokenExp = '';
    let state = store.getState();

    if ('accessToken' in localStorage) {
        accessToken = localStorage.getItem('accessToken');
        tokenExp = jwt_decode(accessToken).exp;
    } else {
        return false;
    }
    if (state.auth.loggedIn === false) {
        return false;
    }
    if (tokenExp * 1000 <= Date.now()) {
        return false;
    }
    return true;
}


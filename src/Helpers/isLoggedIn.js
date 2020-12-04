import jwt_decode from 'jwt-decode';
import { loginSuccess } from '../Redux/Actions/authActions';
import store from './../Redux/store';

export function isLoggedIn() {
    let accessToken = '';
    let tokenExp = '';
    // let state = store.getState();
    let dispatch = store.dispatch;

    if ('accessToken' in localStorage) {
        accessToken = localStorage.getItem('accessToken');
        tokenExp = jwt_decode(accessToken).exp;
    } else {
        return false;
    }
    // if (state.auth.loggedIn === false) {
    //     return false;
    // }
    if (tokenExp * 1000 <= Date.now()) {
        return false;
    } else {
        dispatch(loginSuccess())
    }
    return true;
}


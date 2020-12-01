import { authConsts } from '../Consts/authConsts';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// TODO: Needs expired token and 401 validation
export function login(email, password) {
    return (dispatch) => {
        dispatch(loginPending())
        axios.post(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api/v1/login`, { email, password })
        .then(res => {
            localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
            dispatch(loginSuccess());
        })
        .catch(err => {
            if (err && err.response.status === 401) {
                toast.error('Your login attempt failed. Confirm your email address and password are correct and try again.');
            } else {
            toast.error('Login failed.')
            }
        })
    };
}

export function loginPending() {
    return {
        type: authConsts.LOGIN_PENDING
    };
}

export function loginSuccess() {
    return {
        type: authConsts.LOGIN_SUCCESS
    };
}

export function refreshLogin() {
    return (dispatch) => {
        let accessToken = '';
        let tokenExp = '';

        if ('accessToken' in localStorage) {
            accessToken = localStorage.getItem('accessToken');
            tokenExp = jwt_decode(accessToken).exp;
        } else {
            console.log('no token');
            return false;
        }
        if (tokenExp * 1000 <= Date.now()) {
            console.log('token expired');
           return false;
        }
        dispatch(loginSuccess());
        return true;
    }
}

export function logout() {
    localStorage.clear();
    return {
        type: authConsts.LOGOUT
    }
}
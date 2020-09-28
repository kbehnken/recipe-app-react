import axios from 'axios'

// Initial state
const initialState = {
    users: [],
    loading: true
};

// Constants
const REQUEST_USER_DATA = 'REQUEST_USER_DATA';
const REQUEST_USER_DATA_BY_ID = 'REQUEST_USER_DATA_BY_ID';
const ADD_USER_DATA = 'ADD_USER_DATA';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
const REMOVE_USER_DATA = 'REMOVE_USER_DATA';

// Action creators
export function requestUserData() {
    let data = axios.get('api/v1/users').then(res => res.data)
    return {
        type: REQUEST_USER_DATA,
        payload: data
    };
}
export function requestUserDataById(userId) {
    let data = axios.get(`http://localhost:4042/api/v1/users/${userId}`).then(res => res.data)
    return {
        type: REQUEST_USER_DATA_BY_ID,
        payload: data
    };
}
export function addUserData(firstName, lastName, email, password, isAdmin) {
    return {
        type: ADD_USER_DATA,
        payload: axios.post('http://localhost:4042/api/v1/users', {
            firstName,
            lastName,
            email,
            password,
            isAdmin
        })
    };
}
export function updateUserData(firstName, lastName, email, password, isAdmin, userId) {
    return {
        type: UPDATE_USER_DATA,
        payload: axios.put(`http://localhost:4042/api/v1/users/${userId}`, {
            firstName,
            lastName,
            email,
            password,
            isAdmin
        })
    };
}
export function removeUserData(userId) {
    return {
        type: REMOVE_USER_DATA,
        payload: axios.delete(`http://localhost:4042/api/v1/users/${userId}`)
    };
}

// Reducer
export default function reducer(previousState = initialState, action) {
    switch(action.type) {
        case REQUEST_USER_DATA + '_PENDING':
            return ({
                ...previousState,
                loading: true
            });
        case REQUEST_USER_DATA + '_FULFILLED':
            return ({
                ...previousState,
                loading: false,
                users: action.payload
            });
        case REQUEST_USER_DATA_BY_ID + '_PENDING':
            return ({
                ...previousState,
                loading: true
            });
        case REQUEST_USER_DATA_BY_ID + '_FULFILLED':
            return ({
                ...previousState,
                loading: false,
                users: action.payload
            });
        case ADD_USER_DATA + '_PENDING':
            return ({
                ...previousState,
                loading: true
            });
        case ADD_USER_DATA + '_FULFILLED':
            return ({
                ...previousState,
                users: action.payload.data,
                loading: false
            });
        case UPDATE_USER_DATA + '_PENDING':
            return ({
                ...previousState,
                loading: true
            });
        case UPDATE_USER_DATA + '_FULFILLED':
            return ({
                ...previousState,
                loading: false,
                users: action.payload.data
            });
        case REMOVE_USER_DATA + '_PENDING':
            return ({
                ...previousState,
                loading: true
            });
        case REMOVE_USER_DATA + '_FULFILLED':
            return ({
                ...previousState,
                loading: false,
                users: action.payload.data
            });
        default: return (previousState);
    }
}
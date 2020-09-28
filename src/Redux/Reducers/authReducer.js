import { authConsts } from '../Consts/authConsts';

// let accessToken = JSON.parse(localStorage.getItem('accessToken'));

// Initial state
const initialState = { 
    loggedIn: false, 
    loading: false
};

export default function reducer(previousState = initialState, action) {
    switch(action.type) {
        case authConsts.LOGIN_PENDING + '_PENDING':
            return ({
                ...previousState,
                loading: true
            });
        case authConsts.LOGIN_SUCCESS:
            console.log('success')
            return ({
                ...previousState,
                // users: action.payload.data,
                loggedIn: true,
                loading: false
            });
        case authConsts.LOGOUT:
            return ({
                ...previousState,
                loggedIn: false
            });
        default:
            return (previousState);
    }
}
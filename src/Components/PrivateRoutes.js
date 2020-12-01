import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../Helpers/isLoggedIn';
import { refreshLogin } from '../Redux/Actions/authActions';

export const PrivateRoute = ({component: Component, ...rest }) => {
    if (!isLoggedIn()) {
        toast.error('Your login has expired. Please log in again.')
    }
    return <Route {...rest} render = {props => (
        isLoggedIn() //|| refreshLogin()
            ? (<Component {...props} />)
            : (<Redirect to = '/logout' />)
    )} />
}
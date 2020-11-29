import React from 'react';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../Helpers/isLoggedIn';
import { refreshLogin } from '../Redux/Actions/authActions';

export const PrivateRoute = ({component: Component, ...rest }) => {
    if (!isLoggedIn()) {
        NotificationManager.error('Your login has expired. Please log in again.')
    }
    return <Route {...rest} render = {props => (
        isLoggedIn() //|| refreshLogin()
            ? (<Component {...props} />)
            : (<Redirect to = '/logout' />)
    )} />
}
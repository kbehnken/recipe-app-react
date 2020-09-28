import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../Helpers/isLoggedIn';
import { refreshLogin } from '../Redux/Actions/authActions';

export const PrivateRoute = ({component: Component, ...rest }) => (
    <Route {...rest} render = {props => (
        isLoggedIn() || refreshLogin()
            ? <Component {...props} />
            : <Redirect to = {{ pathname: '/login', state: { from: props.location }}} />
    )} />
)
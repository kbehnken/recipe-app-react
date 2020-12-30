import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isLoggedIn } from '../Helpers/isLoggedIn';

function PrivateRoutes({component: Component, ...rest }) {
    useEffect(() => {
       if (!isLoggedIn() && 'accessToken' in localStorage) {
            toast.error('Your login has expired. Please log in again.')
        }
    })

    return <Route {...rest} render = {props => (
        isLoggedIn()
            ? (<Component {...props} />)
            : (<Redirect to = '/logout' />)
    )} />
}

export default PrivateRoutes
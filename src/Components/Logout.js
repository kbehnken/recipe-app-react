import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../Redux/Actions/authActions';
import { Redirect } from 'react-router-dom';

function Logout(props) {
    useEffect(() => {
        props.dispatch(logout());
    })

    return (
        <Redirect to='/login' />
    );
}

export default connect()(Logout);
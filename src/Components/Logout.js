import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../Redux/Actions/authActions';
import { Redirect } from 'react-router-dom';

function Logout(props) {
    useEffect(() => {
        props.dispatch(logout);
        // props.history.push('/login');
    })
    return (
        <Redirect to='/login' />
    );
}

function mapStateToProps(reduxState) {
    return {};
}

export default connect(mapStateToProps)(Logout);
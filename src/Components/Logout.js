import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function Logout(props) {
    useEffect(() => {
        localStorage.clear();
    })

    return (
        <Redirect to='/login' />
    );
}

export default Logout;
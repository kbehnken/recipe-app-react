import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../Redux/Actions/authActions';
import { Redirect } from 'react-router-dom';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    if (props.loggedIn === true) {
        return (
            <Redirect to='/' />
        )
    }

    return (
        <div>
            <div>
                <div>
                    <input type='text' placeholder='Enter email address' value={email} onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <input type='password' placeholder='Enter password' value={password} onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <button onClick={() => props.dispatch(login(email, password))}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(reduxState) {
    return {
        loggedIn: reduxState.auth.loggedIn
    }
}

export default connect(mapStateToProps)(Login);
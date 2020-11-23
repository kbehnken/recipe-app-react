import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../Redux/Actions/authActions';
import { Redirect } from 'react-router-dom';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import '../Styles/login.css';
import '../Styles/main.css';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        return setShowPassword(!showPassword);
    };
    if (props.loggedIn === true) {
        return (
            <Redirect to='/' />
        )
    }

    return (
        <div id='outer-login-container'>
            <div id='login-container'>
                <div>
                    <TextField required type='email' variant='outlined' label='Email Address' autoFocus={true} value={email} onChange={e => setEmail(e.target.value)} style={{width: '100%'}} />
                </div>
                {showPassword === false ?
                    (
                        <div>
                            <TextField required type='password' name='password' variant='outlined' label='Password' value={password} onChange={e => setPassword(e.target.value)} style={{width: '100%'}} autoComplete='none' InputProps={{
                                endAdornment:
                                <InputAdornment position='end'>
                                    <BsEyeSlashFill size={20} onClick={togglePasswordVisibility} style={{cursor: 'pointer', color: '#00b300'}} />
                                </InputAdornment>
                            }} />
                        </div>
                    ) :
                    (
                        <div>
                            <TextField required name='password' variant='outlined' label='Password' value={password} onChange={e => setPassword(e.target.value)} style={{width: '100%'}} autoComplete='none' InputProps={{
                                endAdornment:
                                <InputAdornment position='end'>
                                    <BsEyeFill size={20} onClick={togglePasswordVisibility} style={{cursor: 'pointer', color: '#00b300'}} />
                                </InputAdornment>
                            }} />
                        </div>
                    )
                }
                <div>
                    <button className='login-button' onClick={() => props.dispatch(login(email, password))}>
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
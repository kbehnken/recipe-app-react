import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Redirect } from 'react-router-dom';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isLoggedIn } from '../Helpers/isLoggedIn';
import '../Styles/login.css';

function Login(props) {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        return setShowPassword(!showPassword);
    };
    if (isLoggedIn()) {
        return (
            <Redirect to='/' />
        )
    }

    const handleLogin = (email, password) => {
        axios.post(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api/v1/login`, { email, password })
        .then(res => {
            localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
            history.push('/');
        })
        .catch(err => {
            console.log(err)
            if (err && err.response.status === 401) {
                toast.error('Your login attempt failed. Confirm your email address and password are correct and try again.');
            } else {
                toast.error('Login failed.')
            }
        })
    }

    return (
        <div id='outer-login-container'>
            <div id='login-container'>
                <div>
                    <img src='/images/broccoli.png' alt='broccoli' style={{width:'150px', marginBottom: '25px'}} />
                    <TextField required type='email' name='email' variant='outlined' label='Email Address' autoFocus={true} value={email} onChange={e => setEmail(e.target.value)} style={{width: '100%'}} />
                </div>
                {showPassword === false ?
                    (
                        <div>
                            <TextField required type='password' name='password' variant='outlined' label='Password' value={password} onChange={e => setPassword(e.target.value)} style={{width: '100%'}} autoComplete='none' InputProps={{
                                endAdornment:
                                <InputAdornment position='end'>
                                    <BsEyeSlashFill title='Click to show password' size={20} onClick={togglePasswordVisibility} style={{cursor: 'pointer', color: '#00b300'}} />
                                </InputAdornment>
                            }} />
                        </div>
                    ) :
                    (
                        <div>
                            <TextField required name='password' variant='outlined' label='Password' value={password} onChange={e => setPassword(e.target.value)} style={{width: '100%'}} autoComplete='none' InputProps={{
                                endAdornment:
                                <InputAdornment position='end'>
                                    <BsEyeFill title='Click to hide password' size={20} onClick={togglePasswordVisibility} style={{cursor: 'pointer', color: '#00b300'}} />
                                </InputAdornment>
                            }} />
                        </div>
                    )
                }
                <div>
                    <button className='login-button' onClick={() => {handleLogin(email, password)}}>
                        Login
                    </button>
                </div>
                <div className="disclaimer">
                    <p>
                        HEADS UP! This app is intended for demo purposes only. Any changes you make will be lost during scheduled site refresh. 
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;
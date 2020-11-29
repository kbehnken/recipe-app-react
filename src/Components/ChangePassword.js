import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import 'react-notifications/lib/notifications.css';
import { authHeader } from '../Helpers/authHeader'
import '../Styles/main.css';

function ChangePassword(props) {
    const history = useHistory();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const changePassword = () => {
        if (newPassword === confirmPassword) {
            axios.put(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api/v1/change-password`, {newPassword}, {headers: authHeader()})
            .then(() => {
                setNewPassword('');
                setConfirmPassword('');
                return NotificationManager.success('You successfully changed your password');
            })
            .catch(err => {
                NotificationManager.error('Password reset failed.')
            })
        }
    };
    const toggleOldPasswordVisibility = () => {
        return setShowOldPassword(!showOldPassword);
    };
    const toggleNewPasswordVisibility = () => {
        return setShowNewPassword(!showNewPassword);
    };
    const toggleConfirmPasswordVisibility = () => {
        return setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div>
            <div className='form-container'>
                <NotificationContainer />
                {showOldPassword === false ?
                    (
                        <div>
                            <TextField required type='password' name='oldPassword' variant='outlined' label='Old Password' onChange={e => setOldPassword(e.target.value)} value={oldPassword} autoComplete='none' InputProps={{
                                endAdornment:
                                <InputAdornment position='end'>
                                    <BsEyeSlashFill size={20} onClick={toggleOldPasswordVisibility} style={{cursor: 'pointer', color: '#00b300'}} />
                                </InputAdornment>
                            }} />
                        </div>
                    ):
                    (
                        <div>
                            <TextField required name='oldPassword' variant='outlined' label='Old Password' onChange={e => setOldPassword(e.target.value)} value={oldPassword} autoComplete='none' InputProps={{
                                endAdornment:
                                <InputAdornment position='end'>
                                    <BsEyeFill size={20} onClick={toggleOldPasswordVisibility} style={{cursor: 'pointer', color: '#00b300'}} />
                                </InputAdornment>
                            }} />
                        </div>
                    )
                }
                {newPassword !== confirmPassword ?
                    (
                        <div style={{color: 'red'}}>
                            New Password and Confirm Password must match
                        </div>
                    ) :
                    (
                        null
                    )
                }
                {showNewPassword === false ?
                    (
                        <div>
                            <div>
                                <TextField required type='password' name='newPassword' variant='outlined' label='New Password' onChange={e => setNewPassword(e.target.value)} value={newPassword} autoComplete='none' InputProps={{
                                    endAdornment:
                                    <InputAdornment position='end'>
                                        <BsEyeSlashFill size={20} onClick={toggleNewPasswordVisibility} style={{cursor: 'pointer', color: '#00b300'}} />
                                    </InputAdornment>
                                }} />
                            </div>
                        </div>
                    ):
                    (
                        <div>
                            <div>
                                <TextField required name='newPassword' variant='outlined' label='New Password' onChange={e => setNewPassword(e.target.value)} value={newPassword} autoComplete='none' InputProps={{
                                    endAdornment:
                                    <InputAdornment position='end'>
                                        <BsEyeFill size={20} onClick={toggleNewPasswordVisibility} style={{cursor: 'pointer', color: '#00b300'}} />
                                    </InputAdornment>
                                }} />
                            </div>
                        </div>
                    )
                }
                {showConfirmPassword === false ?
                    (
                        <div>
                            <div>
                                <TextField required type='password' name='confirmPassword' variant='outlined' label='Confirm Password' onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} autoComplete='none'InputProps={{
                                    endAdornment:
                                    <InputAdornment position='end'>
                                        <BsEyeSlashFill size={20} onClick={toggleConfirmPasswordVisibility} style={{cursor: 'pointer', color: '#00b300'}} />
                                    </InputAdornment>
                                }} />
                            </div>
                        </div>
                    ):
                    (
                        <div>
                            <div>
                                <TextField required name='confirmPassword' variant='outlined' label='Confirm Password' onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} autoComplete='none' InputProps={{
                                    endAdornment:
                                    <InputAdornment position='end'>
                                        <BsEyeFill size={20} onClick={toggleConfirmPasswordVisibility} style={{cursor: 'pointer', color: '#00b300'}} />
                                    </InputAdornment>}} />
                            </div>
                        </div>
                    )
                }
                <div>
                    <button type='button' onClick={history.goBack}>
                            Cancel
                        </button>
                    <button type='button' onClick={() => changePassword()}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
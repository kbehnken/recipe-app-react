import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-notifications/lib/notifications.css';
import TextField from '@material-ui/core/TextField';
import { getUserInfo } from '../Helpers/getUserInfo';
import { authHeader } from '../Helpers/authHeader'
import '../Styles/main.css';

function UserInfo(props) {
    const user = getUserInfo();
    const history = useHistory();
    const [first_name, setFirstName] = useState(user.first_name);
    const [last_name, setLastName] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    const updateUserInfo = () => {
        axios.put(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api/v1/users/${user.user_id}`, {first_name, last_name, email}, {headers: authHeader()})
        .then((res) => {
            console.log(res);
            localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
            return toast.success('You successfully updated your personal information');
        })
        .catch(err => {
            toast.error('The system encountered an error. Update failed.')
        })
    }
    
    return (
        <div className='form-container'>
            <div>
                <TextField required name='first_name' variant='outlined' label='First Name' onChange={e => setFirstName(e.target.value)} value={first_name} />
            </div>
            <div>
                <TextField required name='last_name' variant='outlined' label='Last Name' onChange={e => setLastName(e.target.value)} value={last_name} />
            </div>
            <div>
                <TextField required name='email' variant='outlined' label='Email / Username' onChange={e => setEmail(e.target.value)} value={email} />
            </div>
            <div>
                <button type='button' onClick={history.goBack}>
                    Cancel
                </button>
                <button type='button' onClick={() => updateUserInfo()}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default UserInfo;
import React from 'react';
import Nav from './Nav';
import UserInfo from './UserInfo';
import ChangePassword from './ChangePassword';

function Profile() {
    return (
        <div>
            <div>
                <Nav />
            </div>
            <div className='outer-content-container'>
                <div>
                    <h1>
                        Update Personal Info
                    </h1>
                    <UserInfo />
                </div>
                <hr />
                <div>
                    <h1>
                        Change Password
                    </h1>
                    <ChangePassword />
                </div>
            </div>
        </div>
    );
}

export default Profile;
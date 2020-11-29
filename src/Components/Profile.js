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
                    <UserInfo />
                </div>
                <hr />
                <div>
                    <ChangePassword />
                </div>
            </div>
        </div>
    );
}

export default Profile;
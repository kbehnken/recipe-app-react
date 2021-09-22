import React from 'react';
import { getUserInfo } from '../Helpers/getUserInfo';
import Nav from './Nav';

function Header() {
    
    return (
        <header>
            <div>
                Welcome, {getUserInfo().first_name}!
            </div>
            <Nav />
        </header>
    );
}

export default Header;
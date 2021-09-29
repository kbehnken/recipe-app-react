import React from 'react';
import { getUserInfo } from '../Helpers/getUserInfo';
import Search from './Search';
import Nav from './Nav';

function Header() {
    
    return (
        <header>
            <div className='flex-between'>
                <div>
                    Welcome, {getUserInfo().first_name}!
                </div>
                <Search />
            </div>
            <Nav />
        </header>
    );
}

export default Header;
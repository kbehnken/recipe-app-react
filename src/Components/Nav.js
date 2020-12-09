import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi'
import '../Styles/nav.css'

export default function Nav() {
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenuVisibility = () => {
        return setShowMenu(!showMenu);
    };

    return (
        <div>
            <nav>
                <div>
                    <Link to='/'>
                        Dashboard
                    </Link>
                </div>
                <div>
                    <Link to='/all-recipes'>
                        Browse All Recipes
                    </Link>
                </div>
                <div>
                    <Link to='/add-recipe' activeStyle={{ backgrounColor: 'red' }}>
                        Add a New Recipe
                    </Link>
                </div>
                <div>
                    <Link to='/my-recipes'>
                        My Recipes
                    </Link>
                </div>
                <div className='user-icon'>
                    <FaRegUser onClick={toggleMenuVisibility} style={{cursor: 'pointer'}} />
                    {showMenu === true ?
                        (
                            <menu>
                                <div>
                                    <Link to='/change-password'>
                                        Change Password
                                    </Link>
                                </div>
                                <div>
                                    <Link to='/logout'>
                                        Logout
                                    </Link>
                                </div>
                            </menu>
                        ) :
                        (
                            null
                        )
                    }
                </div>
            </nav>
            <div id='hamburger-nav'>
                <div className='hamburger-icon' style={{width: '18px'}}>
                    <GiHamburgerMenu onClick={toggleMenuVisibility} style={{cursor: 'pointer'}} />
                    {showMenu === true ?
                        (
                            <menu>
                                <div>
                                    <Link to='/'>
                                        Dashboard
                                    </Link>
                                </div>
                                <div>
                                    <Link to='/all-recipes'>
                                        Browse All Recipes
                                    </Link>
                                </div>
                                <div>
                                    <Link to='/add-recipe'>
                                        Add a New Recipe
                                    </Link>
                                </div>
                                <div>
                                    <Link to='/my-recipes'>
                                        My Recipes
                                    </Link>
                                </div>
                                <div>
                                    <Link to='/change-password'>
                                        Change Password
                                    </Link>
                                </div>
                                <div>
                                    <Link to='/logout'>
                                        Logout
                                    </Link>
                                </div>
                            </menu>
                        ) :
                        (
                            null
                        )
                    }
                </div>
            </div>
        </div>
    );    
}
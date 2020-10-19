import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser } from 'react-icons/fa';
import '../Styles/nav.css'

export default function Nav(props) {
    return (
        <nav>
            <Link to='/all-recipes'>
                Browse All Recipes
            </Link>
            <Link to='/add-recipe'>
                Add a New Recipe
            </Link>
            <Link to='/edit-my-recipes'>
                Edit My Recipes
            </Link>
            <Link to='/logout'>
                <FaRegUser style={{ fill: '#00b300' }} />
            </Link>
        </nav>
    );    
}
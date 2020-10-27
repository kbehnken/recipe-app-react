import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './Components/PrivateRoutes.js';
import Dashboard from './Components/Dashboard';
import AllRecipes from './Components/AllRecipes'
import RecipeForm from './Components/RecipeForm';
import MyRecipes from './Components/MyRecipes'
import RecipeCard from './Components/RecipeCard';
import Login from './Components/Login';
import Logout from './Components/Logout';
import SearchResults from './Components/SearchResults.js';

export default (
    <Switch>
        <PrivateRoute exact path='/' component={Dashboard} />
        <PrivateRoute path='/all-recipes' component={AllRecipes} />
        <PrivateRoute path='/add-recipe' component={RecipeForm} />
        <PrivateRoute path='/my-recipes' component={MyRecipes} />
        <PrivateRoute path='/recipe-card/:recipe_id' component={RecipeCard} />
        <PrivateRoute path='/search-results' component={SearchResults} />
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
    </Switch>
);
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoutes';
import Dashboard from './Components/Dashboard';
import AllRecipes from './Components/AllRecipes'
import CreateRecipeForm from './Components/CreateRecipeForm';
import UpdateRecipeForm from './Components/UpdateRecipeForm'
import MyRecipes from './Components/MyRecipes'
import RecipeCard from './Components/RecipeCard';
import SearchResults from './Components/SearchResults';
import ChangePassword from './Components/ChangePassword';
import Login from './Components/Login';
import Logout from './Components/Logout';

export default (
    <Switch>
        <PrivateRoute exact path='/' component={Dashboard} />
        <PrivateRoute path='/all-recipes' component={AllRecipes} />
        <PrivateRoute path='/add-recipe' component={CreateRecipeForm} />
        <PrivateRoute path='/my-recipes' component={MyRecipes} />
        <PrivateRoute path='/update-recipes/:recipe_id' component={UpdateRecipeForm} />
        <PrivateRoute path='/recipe-card/:recipe_id' component={RecipeCard} />
        <PrivateRoute path='/search-results' component={SearchResults} />
        <PrivateRoute path='/change-password' component={ChangePassword} />
        <Route path='/login' component={Login} />
        <Route path='/logout' component={Logout} />
    </Switch>
);
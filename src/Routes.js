import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from './Components/PrivateRoutes.js';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import Logout from './Components/Logout';
import RecipeCard from './Components/RecipeCard';
// import RecipeForm from './Components/RecipeForm';

export default (
  <Switch>
    <PrivateRoute exact path='/' component={Dashboard} />
    <PrivateRoute path='/recipe-card/:recipe_id' component={RecipeCard} />
    <Route path='/login' component={Login} />
    <Route path='/logout' component={Logout} />
  </Switch>
);
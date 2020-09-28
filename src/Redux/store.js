import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import authReducer from './Reducers/authReducer'
import userReducer from './Reducers/userReducer';
import recipeReducer from './Reducers/recipeReducer';
// import ingredientReducer from './ingredientReducer';

const rootReducer = combineReducers( {
    auth: authReducer,
    user: userReducer,
    recipe: recipeReducer,
    // ingredient: ingredientReducer
})

// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import recipeReducer from './Reducers/recipeReducer';

const rootReducer = combineReducers( {
    recipe: recipeReducer
})

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));
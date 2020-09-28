import axios from 'axios';
import { recipeConsts } from '../Consts/recipeConsts';
import { authHeader } from '../../Helpers/authHeader';

// Request all recipes
export function requestRecipeData() {
    return function (dispatch) {
        dispatch(requestRecipeDataPending());
        axios.get('http://localhost:4042/api/v1/recipes', {headers: authHeader()})
        .then(res => {
            dispatch(requestRecipeDataSuccess(res.data))
        })
        .catch(err => {
            console.log(err);
        });
    }
    
}
function requestRecipeDataPending() {
    return {
        type: recipeConsts.REQUEST_RECIPE_DATA_PENDING
    };
}
function requestRecipeDataSuccess(data) {
    return {
        type: recipeConsts.REQUEST_RECIPE_DATA_SUCCESS,
        payload: data
    };
}

// Request a single recipe by recipe_id
export function requestRecipeDataById(recipe_id) {
    return function (dispatch) {
        dispatch(requestRecipeDataByIdPending());
        axios.get(`http://localhost:4042/api/v1/recipes/${recipe_id}`, {headers: authHeader()})
        .then(res => {
            console.log(res);
            dispatch(requestRecipeDataByIdSuccess(res.data));
        })
        .catch(err => {
            console.log(err);
        });
    }
    
}
function requestRecipeDataByIdPending() {
    return {
        type: recipeConsts.REQUEST_RECIPE_DATA_BY_ID_PENDING
    };
}
function requestRecipeDataByIdSuccess(data) {
    return {
        type: recipeConsts.REQUEST_RECIPE_DATA_BY_ID_SUCCESS,
        payload: data
    };
}

export function requestRecipeDataByAuthor(recipeId) {
    let data = axios.get(`http://localhost:4042/api/v1/recipes/${recipeId}`).then(res => res.data)
    return {
        type: recipeConsts.REQUEST_RECIPE_DATA_BY_AUTHOR,
        payload: data
    };
}
export function addRecipeData(recipeName, photoUrl, prepTime, cookTime, directions) {
    return {
        type: recipeConsts.ADD_RECIPE_DATA,
        payload: axios.post('http://localhost:4042/api/v1/recipes', {
            recipeName,
            photoUrl,
            prepTime,
            cookTime,
            directions
        })
    };
}
export function updateStoredRecipeData(recipeName, photoUrl, prepTime, cookTime, directions, recipeId) {
    return {
        type: recipeConsts.UPDATE_STORED_RECIPE_DATA,
        payload: axios.put(`http://localhost:4042/api/v1/recipes/${recipeId}`, {
            recipeName,
            photoUrl,
            prepTime,
            cookTime,
            directions
        })
    };
}
export function updateActiveRecipeData(field, value) {
    return ({
        type: recipeConsts.UPDATE_ACTIVE_RECIPE_DATA,
        payload: {field, value}
    });
}
export function removeRecipeData(recipeId) {
    return ({
        type: recipeConsts.REMOVE_RECIPE_DATA,
        payload: axios.delete(`http://localhost:4042/api/v1/recipes/${recipeId}`)
    });
}
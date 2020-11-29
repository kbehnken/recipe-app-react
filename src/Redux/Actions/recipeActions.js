import axios from 'axios';
import { recipeConsts } from '../Consts/recipeConsts';
import { authHeader } from '../../Helpers/authHeader';
import { getUserInfo } from '../../Helpers/getUserInfo';

// Request all recipes
export function requestRecipeData() {
    return function (dispatch) {
        dispatch(requestRecipeDataPending());
        axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api/v1/recipes`, {headers: authHeader()})
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

// Request all recipes by userId
export function requestRecipeDataByUserId(user_id) {
    return function (dispatch) {
        dispatch(requestRecipeDataByUserIdPending());
        axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api/v1/recipes-by-author/${user_id}`, {headers: authHeader()})
        .then(res => {
            dispatch(requestRecipeDataByUserIdSuccess(res.data))
        })
        .catch(err => {
            console.log(err);
        });
    }
    
}
function requestRecipeDataByUserIdPending() {
    return {
        type: recipeConsts.REQUEST_RECIPE_DATA_BY_USER_ID_PENDING
    };
}
function requestRecipeDataByUserIdSuccess(data) {
    return {
        type: recipeConsts.REQUEST_RECIPE_DATA_BY_USER_ID_SUCCESS,
        payload: data
    };
}

// Request a single recipe by recipe_id
export function requestRecipeDataById(recipe_id) {
    return function (dispatch) {
        dispatch(requestRecipeDataByIdPending());
        axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api/v1/recipes/${recipe_id}`, {headers: authHeader()})
        .then(res => {
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

// Request recently added recipes
export function requestRecentRecipeData() {
    return function (dispatch) {
        dispatch(requestRecentRecipeDataPending());
        axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api/v1/recent-recipes`, {headers: authHeader()})
        .then(res => {
            dispatch(requestRecentRecipeDataSuccess(res.data))
        })
        .catch(err => {
            console.log(err);
        });
    }
    
}
function requestRecentRecipeDataPending() {
    return {
        type: recipeConsts.REQUEST_RECENT_RECIPE_DATA_PENDING
    };
}
function requestRecentRecipeDataSuccess(data) {
    return {
        type: recipeConsts.REQUEST_RECENT_RECIPE_DATA_SUCCESS,
        payload: data
    };
}

export function requestRecipeDataByAuthor(author) {
    let data = axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api/v1/recipes/${author}`)
    .then(res => res.data)
    return {
        type: recipeConsts.REQUEST_RECIPE_DATA_BY_AUTHOR,
        payload: data
    };
}

// Create a new recipe
export function addRecipeData() {
    return function (dispatch, getState) {
        const { recipe } = getState().recipe;
        let formData = new FormData();

        formData.append('recipe_name', recipe.recipe_name)
        formData.append('imageFile', recipe.imageFile)
        formData.append('prep_time', recipe.prep_time)
        formData.append('cook_time', recipe.cook_time)
        formData.append('ingredients', JSON.stringify(recipe.ingredients))
        formData.append('directions', recipe.directions)
        dispatch(addRecipeDataPending());

        return axios.post(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api/v1/recipes`, formData,
        {
            headers: {
                ...authHeader(),
                'content-type': 'multipart/form-data'
            }
        })
        .then(() => {
            dispatch(addRecipeDataSuccess())
        })
    }
}
function addRecipeDataPending() {
    return {
        type: recipeConsts.ADD_RECIPE_DATA_PENDING
    };
}
function addRecipeDataSuccess() {
    return {
        type: recipeConsts.ADD_RECIPE_DATA_SUCCESS
    };
}

// Update a recipe by recipeId
export function updateStoredRecipeData() {
    return function (dispatch, getState) {
        const { recipe } = getState().recipe;
        let formData = new FormData();

        formData.append('recipe_name', recipe.recipe_name)
        formData.append('imageFile', recipe.imageFile)
        formData.append('prep_time', recipe.prep_time)
        formData.append('cook_time', recipe.cook_time)
        formData.append('ingredients', JSON.stringify(recipe.ingredients))
        formData.append('directions', recipe.directions)
        dispatch(updateStoredRecipeDataPending());
        
        return axios.put(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api/v1/recipes/${recipe.recipe_id}`, formData,
        {
            headers: {
                ...authHeader(),
                'content-type': 'multipart/form-data'
            }
        })
        .then(() => {
            dispatch(updateStoredRecipeDataSuccess())
        })
        .catch(err => {
            console.log(err);
        });
    }
}
function updateStoredRecipeDataPending() {
    return {
        type: recipeConsts.UPDATE_STORED_RECIPE_DATA_PENDING
    };
}
function updateStoredRecipeDataSuccess() {
    return {
        type: recipeConsts.UPDATE_STORED_RECIPE_DATA_SUCCESS
    };
}

export function updateActiveRecipeData(field, value) {
    return ({
        type: recipeConsts.UPDATE_ACTIVE_RECIPE_DATA,
        payload: {field, value}
    });
}

// Remove a recipe
export function removeRecipeData(recipe_id) {
    return ({
        type: recipeConsts.REMOVE_RECIPE_DATA,
        payload: axios.delete(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api/v1/recipes/${recipe_id}`)
    });
}

// Request all favorite recipes by userId
export function requestFavoriteRecipeDataByUserId(user_id) {
    return function (dispatch) {
        dispatch(requestFavoriteRecipeDataByUserIdPending());
        axios.get(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api/v1/recipes/favorites/${user_id}`, {headers: authHeader()})
        .then(res => {
            dispatch(requestFavoriteRecipeDataByUserIdSuccess(res.data))
        })
        .catch(err => {
            console.log(err);
        });
    }
}
function requestFavoriteRecipeDataByUserIdPending() {
    return {
        type: recipeConsts.REQUEST_FAVORITE_RECIPE_DATA_BY_USER_ID_PENDING
    };
}
function requestFavoriteRecipeDataByUserIdSuccess(data) {
    return {
        type: recipeConsts.REQUEST_FAVORITE_RECIPE_DATA_BY_USER_ID_SUCCESS,
        payload: data
    };
}

// Create a new favorite recipe
export function addFavoriteRecipeData() {
    return function (dispatch, getState) {
        const { recipe_id } = getState().recipe.recipe
        console.log(getState().recipe)
        dispatch(addFavoriteRecipeDataPending());
        axios.post(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api/v1/recipes/favorites`, {
            user_id: getUserInfo().user_id,
            recipe_id: recipe_id
        },
        {
            headers: authHeader()
        })
        .then(() => {
            dispatch(addFavoriteRecipeDataSuccess())
        })
        .catch(err => {
            console.log(err);
        });
    }
}
function addFavoriteRecipeDataPending() {
    return {
        type: recipeConsts.ADD_FAVORITE_RECIPE_DATA_PENDING
    };
}
function addFavoriteRecipeDataSuccess() {
    return {
        type: recipeConsts.ADD_FAVORITE_RECIPE_DATA_SUCCESS
    };
}

// Remove a favorite recipe
export function removeFavoriteRecipeData(recipe_id) {
    return function (dispatch) {
        dispatch(removeFavoriteRecipeDataPending());
        axios.delete(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api/v1/recipes/favorites/${recipe_id}`, {headers: authHeader()})
        .then(res => {
            dispatch(removeFavoriteRecipeDataSuccess(res.data))
        })
        .catch(err => {
            console.log(err);
        });
    }
}
function removeFavoriteRecipeDataPending() {
    return ({
        type: recipeConsts.REMOVE_FAVORITE_RECIPE_DATA_PENDING
    });
}
function removeFavoriteRecipeDataSuccess() {
    return ({
        type: recipeConsts.REMOVE_FAVORITE_RECIPE_DATA_SUCCESS
    });
}

// Add an ingredient to a recipe
export function addIngredientData(ingredient_name, quantity) {
    return {
        type: recipeConsts.ADD_INGREDIENT_DATA,
        payload: {
            ingredient_name,
            quantity
        }
    }
}

// Remove an ingredient from a recipe
export function removeIngredientData(ingredient_id) {
    return {
        type: recipeConsts.REMOVE_INGREDIENT_DATA,
        payload: ingredient_id
    }
}

// Clear recipe data from input fields after form submission
export function clearRecipeData() {
    return {
        type: recipeConsts.CLEAR_RECIPE_DATA
    };
}

// Search all recipe names
export function getSearchResults(search) {
    return function (dispatch) {
        dispatch(getSearchResultsPending());
        return axios.post(`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api/v1/search-recipes`, {
            search
        }, 
        {
            headers: authHeader()
        })
        .then(res => {
            dispatch(getSearchResultsSuccess(res.data))
        })
        .catch(err => {
            console.log(err);
        });
    }
    
}
function getSearchResultsPending() {
    return {
        type: recipeConsts.GET_SEARCH_RESULTS_PENDING
    };
}
function getSearchResultsSuccess(data) {
    return {
        type: recipeConsts.GET_SEARCH_RESULTS_SUCCESS,
        payload: data
    };
}

import { recipeConsts } from '../Consts/recipeConsts';

const initialState = {
    recipe: {recipe_id: 0, recipe_name: '', imageFile: null, prep_time: '', cook_time: '', ingredients: [], directions: '', is_favorite: false},
    recipes: [],
    recentRecipes: [],
    searchResults: [],
    loading: false
};

export default function reducer(previousState = initialState, action) {
    switch(action.type) {
        case recipeConsts.REQUEST_RECIPE_DATA_PENDING:
            return ({
                ...previousState,
                loading: true
            });
        case recipeConsts.REQUEST_RECIPE_DATA_SUCCESS:
            return ({
                ...previousState,
                loading: false,
                recipes: action.payload
            });
        case recipeConsts.REQUEST_RECIPE_DATA_BY_ID_PENDING:
            return ({
                ...previousState,
                loading: true
            });
        case recipeConsts.REQUEST_RECIPE_DATA_BY_ID_SUCCESS:
            return ({
                ...previousState,
                loading: false,
                recipe: action.payload
            });
        case recipeConsts.REQUEST_RECIPE_DATA_BY_USER_ID_PENDING:
            return ({
                ...previousState,
                loading: true
            });
        case recipeConsts.REQUEST_RECIPE_DATA_BY_USER_ID_SUCCESS:
            return ({
                ...previousState,
                loading: false,
                recipes: action.payload
            });
        case recipeConsts.REQUEST_FAVORITE_RECIPE_DATA_BY_USER_ID_PENDING:
            return ({
                ...previousState,
                loading: true
            });
        case recipeConsts.REQUEST_FAVORITE_RECIPE_DATA_BY_USER_ID_SUCCESS:
            return ({
                ...previousState,
                loading: false,
                recipes: action.payload
            });
        case recipeConsts.REQUEST_RECENT_RECIPE_DATA_PENDING:
            return ({
                ...previousState,
                loading: true
            });
        case recipeConsts.REQUEST_RECENT_RECIPE_DATA_SUCCESS:
            return ({
                ...previousState,
                loading: false,
                recentRecipes: action.payload
            });
        case recipeConsts.ADD_RECIPE_DATA_PENDING:
            return ({
                ...previousState,
                loading: true
            });
        case recipeConsts.ADD_RECIPE_DATA_SUCCESS:
            return ({
                ...previousState,
                loading: false,
                // recipes: action.payload.data
            });
        case recipeConsts.UPDATE_STORED_RECIPE_DATA + '_PENDING':
            return ({
                ...previousState,
                loading: true
            });
        case recipeConsts.UPDATE_STORED_RECIPE_DATA + '_FULFILLED':
            return ({
                ...previousState,
                loading: false,
                recipes: action.payload.data
            });
        case recipeConsts.UPDATE_ACTIVE_RECIPE_DATA:
            return ({
                ...previousState,
                recipe: {
                    ...previousState.recipe,
                    [action.payload.field]: action.payload.value
                }
            });
        case recipeConsts.REMOVE_RECIPE_DATA_PENDING:
            return ({
                ...previousState,
                loading: true
            });
        case recipeConsts.REMOVE_RECIPE_DATA_SUCCESS:
            return ({
                ...previousState,
                loading: false,
                recipes: action.payload.data
            });
        case recipeConsts.ADD_FAVORITE_RECIPE_DATA_PENDING:
            return ({
                ...previousState,
                loading: true
            });
        case recipeConsts.ADD_FAVORITE_RECIPE_DATA_SUCCESS:
            return ({
                ...previousState,
                recipe: {
                    ...previousState.recipe,
                    is_favorite: true
                },
                loading: false
            });
        case recipeConsts.REMOVE_FAVORITE_RECIPE_DATA_PENDING:
            return ({
                ...previousState,
                loading: true
            });
        case recipeConsts.REMOVE_FAVORITE_RECIPE_DATA_SUCCESS:
            return ({
                ...previousState,
                recipe: {
                    ...previousState.recipe,
                    is_favorite: false
                },
                loading: false
            });
        case recipeConsts.ADD_INGREDIENT_DATA:
            return ({
                ...previousState,
                recipe: {
                    ...previousState.recipe,
                    ingredients: [...previousState.recipe.ingredients, action.payload]
                }
            });
        case recipeConsts.REMOVE_INGREDIENT_DATA:
            return ({
                ...previousState,
                recipe: {
                    ...previousState.recipe,
                    ingredients: previousState.recipe.ingredients.filter((item, index) => index !== action.payload)
                }
            });
        case recipeConsts.CLEAR_RECIPE_DATA:
            return ({
                ...previousState,
                recipe: initialState.recipe
            });
        case recipeConsts.GET_SEARCH_RESULTS_PENDING:
            return ({
                ...previousState,
                loading: true
            });
        case recipeConsts.GET_SEARCH_RESULTS_SUCCESS:
            return ({
                ...previousState,
                loading: false,
                searchResults: action.payload
            });
        default: return (previousState);
    }
}
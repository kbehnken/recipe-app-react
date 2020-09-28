import { recipeConsts } from '../Consts/recipeConsts';

const initialState = {
    recipe: {recipe_id: 0, recipe_name: '', photo_url: '', prep_time: '', cook_time: '', directions: ''},
    recipes: [],
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
        case recipeConsts.ADD_RECIPE_DATA + '_PENDING':
            return ({
                ...previousState,
                loading: true
            });
        case recipeConsts.ADD_RECIPE_DATA + '_FULFILLED':
            return ({
                ...previousState,
                recipes: action.payload.data,
                loading: false
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
                activeRecipe: {
                    ...previousState.activeRecipe,
                    [action.payload.field]: action.payload.value
                }
            });
        case recipeConsts.REMOVE_RECIPE_DATA + '_PENDING':
            return ({
                ...previousState,
                loading: true
            });
        case recipeConsts.REMOVE_RECIPE_DATA + '_FULFILLED':
            return ({
                ...previousState,
                loading: false,
                recipes: action.payload.data
            });
        default: return (previousState);
    }
}
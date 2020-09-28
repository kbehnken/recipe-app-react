import axios from 'axios'

// Initial state

const initialState = {
    ingredientList: [],
    loading: true
};

// Constants
const REQUEST_INGREDIENT_DATA = 'REQUEST_INGREDIENT_DATA';
const ADD_INGREDIENT_DATA = 'ADD_INGREDIENT_DATA';
const UPDATE_INGREDIENT_DATA = 'UPDATE_INGREDIENT_DATA';
const REMOVE_INGREDIENT_DATA = 'REMOVE_INGREDIENT_DATA';

// Action creators
export function requestIngredientData() {
    let data = axios.get('http://localhost:4042/api/v1/ingredients').then(res => res.data)
    return {
        type: REQUEST_INGREDIENT_DATA,
        payload: data
    };
}
export function addIngredientData(ingredientName) {
    return {
        type: ADD_INGREDIENT_DATA,
        payload: axios.post('http://localhost:4042/api/v1/ingredients', {
            ingredientName
        })
    };
}
export function updateIngredientData(ingredientName, ingredientId) {
    return {
        type: UPDATE_INGREDIENT_DATA,
        payload: axios.put(`http://localhost:4042/api/v1/ingredients/${ingredientId}`, {
            ingredientName
        })
    };
}
export function removeIngredientData(ingredientId) {
    return {
        type: REMOVE_INGREDIENT_DATA,
        payload: axios.delete(`http://localhost:4042/api/v1/ingredients/${ingredientId}`)
    };
}

// Reducer
export default function reducer(previousState = initialState, action) {
    switch(action.type) {
        case REQUEST_INGREDIENT_DATA + '_PENDING':
            return ({
                ...previousState,
                loading: true
            })
        case REQUEST_INGREDIENT_DATA + '_FULFILLED':
            return ({
                ...previousState,
                loading: false,
                ingredientList: action.payload
            })
        case ADD_INGREDIENT_DATA + '_PENDING':
            return {
                ...previousState,
                loading: true
            };
        case ADD_INGREDIENT_DATA + '_FULFILLED':
            return {
                ...previousState,
                equipmentList: action.payload.data,
                loading: false
            };
        case UPDATE_INGREDIENT_DATA + '_PENDING':
            return {
                ...previousState,
                loading: true
            };
        case UPDATE_INGREDIENT_DATA + '_FULFILLED':
            return {
                ...previousState,
                loading: false,
                ingredientList: action.payload.data
            };
        case REMOVE_INGREDIENT_DATA + '_PENDING':
            return {
                ...previousState,
                loading: true
            };
        case REMOVE_INGREDIENT_DATA + '_FULFILLED':
            return {
                ...previousState,
                loading: false,
                ingredientList: action.payload.data
            };
        default: return (previousState);
    }
}
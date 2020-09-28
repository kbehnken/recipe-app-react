import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { connect, useDispatch } from 'react-redux';
import { requestRecipeDataById } from '../Redux/Actions/recipeActions';
import '../App.css';

function RecipeCard(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        // if (props.recipe.length === 0) {
        //     dispatch(requestRecipeDataById());
        // }
        dispatch(requestRecipeDataById());
    })
    const { recipe } = props;

    return (
        <div key={recipe.recipe_id}>
            {props.match.params.recipe_id}
            {props.loading ?
                (
                    <p>
                        Loading. Please wait.
                    </p>
                ) :
                (
                    <div>
                        <h1>
                            {recipe.recipe_name}
                        </h1>
                        {recipe.photo_url}<br />
                        <label>Author: </label>{recipe.author}<br />
                        <label>Prep Time: </label>{recipe.prep_time}<br />
                        <label>Cook Time: </label>{recipe.cook_time}
                    </div>
                )
                }
        </div>
    );  
}

function mapStateToProps(reduxState) {
    return {
        recipe: reduxState.recipe.recipe,
        loading: reduxState.recipe.loading
    }
}

export default connect(mapStateToProps)(RecipeCard);
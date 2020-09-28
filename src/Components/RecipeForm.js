import React from 'react';
import { connect } from 'react-redux';
import { addRecipeData, updateActiveRecipeData } from '../Redux/Actions/recipeActions';

function RecipeForm(props) {
    return(
        <div>
            <div>
                <label>Recipe Name:</label>
            </div>
            <div>
                <input type='text' name='recipeName' onChange={event => props.updateActiveRecipeData(event.target.name, event.target.value)} value={props.activeRecipe.recipeName} />
            </div>
            <div>
                <label>Photo URL:</label>
            </div>
            <div>
                <input type='text' name='photoUrl' onChange={event => props.updateActiveRecipeData(event.target.name, event.target.value)} value={props.activeRecipe.photoUrl} />
            </div>
            <div>
                <label>Prep Time:</label>
            </div>
            <div>
                <input type='text' name='prepTime' onChange={event => props.updateActiveRecipeData(event.target.name, event.target.value)} value={props.activeRecipe.prepTime} />
            </div>
            <div>
                <label>Cook Time:</label>
            </div>
            <div>
                <input type='text' name='cookTime' onChange={event => props.updateActiveRecipeData(event.target.name, event.target.value)} value={props.activeRecipe.cookTime} />
            </div>
            <div>
                <label>Directions:</label>
            </div>
            <div>
                <textarea type='text' name='directions' cols='50' rows='5' onChange={event => props.updateActiveRecipeData(event.target.name, event.target.value)} value={props.activeRecipe.directions} />
            </div>
            <div>
                <button type='button'>
                    Cancel
                </button>
                <button type='button' onClick={() => props.addRecipeData()}>
                    Add
                </button>
            </div>
        </div>
    );
}

function mapStateToProps(reduxState) {
    return {
        activeRecipe: reduxState.recipe.activeRecipe
    }
}

export default connect(mapStateToProps, { addRecipeData, updateActiveRecipeData })(RecipeForm);
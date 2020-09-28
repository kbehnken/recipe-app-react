import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { requestRecipeData } from '../Redux/Actions/recipeActions';
import { isLoggedIn } from './../Helpers/isLoggedIn';
import '../App.css';

function Dashboard(props) {
    const dispatch = useDispatch();
    useEffect(() => {
        if (props.recipes.length === 0 && props.loading === false) {
            dispatch(requestRecipeData());
        }
    })
    isLoggedIn();
    const mappedRecipes = props.recipes.map((field) => {
        return(
            <div key={field.recipe_id}>
                <div>
                    <h1>
                        <Link to={{pathname: '/recipe-card/' + field.recipe_id}}>
                            {field.recipe_name}
                        </Link>
                    </h1>
                    {field.photo_url}<br />
                    <label>Author: </label>{field.author}<br />
                    <label>Prep Time: </label>{field.prep_time}<br />
                    <label>Cook Time: </label>{field.cook_time}
                </div>
            </div>
        );
    })
    return(
        <div>
            {props.loading ?
                (
                    <p>
                        Loading. Please wait.
                    </p>
                ) :
                (
                    <div>
                        {mappedRecipes}
                    </div>
                )
            }
        </div>
    );
}

function mapStateToProps(reduxState) {
    return {
        recipes: reduxState.recipe.recipes,
        loading: reduxState.recipe.loading
    }
}

export default connect(mapStateToProps)(Dashboard);
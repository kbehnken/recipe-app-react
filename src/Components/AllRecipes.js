import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { requestRecipeData } from '../Redux/Actions/recipeActions';
import '../Styles/main.css';

function AllRecipes(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestRecipeData());
    },[dispatch])

    const mappedRecipes = props.recipes.map((item) => {
        return(
            <div key={item.recipe_id}>
                <div>
                    <h2>
                        <Link to={{pathname: '/recipe-card/' + item.recipe_id}}>
                            {item.recipe_name}
                        </Link>
                    </h2>
                    {item.photo_url}<br />
                    <label>Contributor: </label>{item.contributor}<br />
                    <label>Prep Time: </label>{item.prep_time}<br />
                    <label>Cook Time: </label>{item.cook_time}<br /><br />
                </div>
            </div>
        );
    })
    return(
        <div id='outer-content-container'>
            {props.loading ?
                (
                    <div>
                        <p>
                            Loading. Pease wait.
                        </p>
                        <Loader type="ThreeDots" color="#00b300" height={50} width={50} timeout={5000} />
                    </div>
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

export default connect(mapStateToProps)(AllRecipes);
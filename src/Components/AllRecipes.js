import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { requestRecipeData } from '../Redux/Actions/recipeActions';
import Search from './Search'
import RecipeTile from './RecipeTile';
import Nav from './Nav';

function AllRecipes(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requestRecipeData());
    },[dispatch])

    const mappedRecipes = props.recipes.map((item) => {
        return(
            <RecipeTile  key={item.recipe_id} recipe={item} />
        );
    })
    return(
        <div>
            <Nav />
            <div className='outer-content-container'>
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
                            <div>
                                <Search />
                            </div>
                            <div className='flex-between-wrap'>
                                {mappedRecipes}
                            </div>
                        </div>
                    )
                }
            </div>
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
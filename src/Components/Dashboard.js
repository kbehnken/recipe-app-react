import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { MdFavorite } from 'react-icons/md';
import Loader from 'react-loader-spinner';
import { requestFavoriteRecipeDataByUserId, requestRecentRecipeData } from '../Redux/Actions/recipeActions';
import { getUserInfo } from '../Helpers/getUserInfo';
import Header from './Header';
import RecipeList from './RecipeList';


function Dashboard(props) {
    const dispatch = useDispatch();
    const user = getUserInfo();

    useEffect(() => {
        dispatch(requestFavoriteRecipeDataByUserId(user.user_id));
        dispatch(requestRecentRecipeData());
    },[dispatch, user.user_id])

    return(
        <div>
            <Header />
            <div className='outer-content-container'>
                {props.loading ?
                    (
                        <div>
                            <p>
                                Loading. Pease wait.
                            </p>
                            <Loader type='ThreeDots' color='#00b300' height={50} width={50} timeout={5000} />
                        </div>
                    ) :
                    (
                        <div>
                            <h1>
                            <MdFavorite title='heart' size={30} style={{ color: 'red' }} /> Favorite Recipes
                            </h1>
                            <RecipeList recipes={props.recipes} />
                            <hr />
                            <h1>
                                Recently Added Recipes
                            </h1>
                            <RecipeList recipes={props.recentRecipes} />
                            <div style={{textAlign: 'right'}}>
                                <Link to='all-recipes'>
                                    View All
                                </Link>
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
        recentRecipes: reduxState.recipe.recentRecipes,
        loading: reduxState.recipe.loading
    }
}

export default connect(mapStateToProps)(Dashboard);
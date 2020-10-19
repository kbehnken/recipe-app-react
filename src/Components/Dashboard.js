import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { requestFavoriteRecipeDataByUserId, requestRecentRecipeData } from '../Redux/Actions/recipeActions';
import { getUserInfo } from '../Helpers/getUserInfo';
import Nav from './Nav';
import '../Styles/main.css';

function Dashboard(props) {
    const dispatch = useDispatch();
    const user = getUserInfo();
    useEffect(() => {
        dispatch(requestFavoriteRecipeDataByUserId(user.user_id));
        dispatch(requestRecentRecipeData());
    },[dispatch, user.user_id])
    const mappedRecipes = props.recipes.map((item) => {
        return (
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
                    <label>Cook Time: </label>{item.cook_time}<br />
                </div>
            </div>
        );
    })
    const mappedRecentRecipes = props.recentRecipes.map((item) => {
        return (
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
                    <label>Cook Time: </label>{item.cook_time}<br />
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
                        <Loader type='ThreeDots' color='#00b300' height={50} width={50} timeout={5000} />
                    </div>
                ) :
                (
                    <div>
                        <div>
                            <Nav />
                        </div>
                        <h1>
                            Welcome, {user.first_name}!
                        </h1>
                        {mappedRecipes.length === 0 ?
                            (
                                <p>You have no favorite recipes to display. <Link to='all-recipes'>Click here</Link> to browse all recipes.</p>
                            ) :
                            (
                                <div>
                                    {mappedRecipes}
                                </div>
                            )
                        }
                        <div>
                            <h1>
                                Recently Added Recipes
                            </h1>
                            <div>
                                    {mappedRecentRecipes}
                            </div>
                            <div>
                                <Link to='all-recipes'>
                                    View All
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }
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
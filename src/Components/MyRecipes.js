import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { requestRecipeDataByUserId } from '../Redux/Actions/recipeActions';
import { getUserInfo } from '../Helpers/getUserInfo';
import Nav from './Nav';
import '../Styles/main.css';

function MyRecipes(props) {
    const dispatch = useDispatch();
    const user = getUserInfo();
    useEffect(() => {
        if (props.recipes.length === 0 && props.loading === false) {
            dispatch(requestRecipeDataByUserId(user.user_id));
        }
    })
    const mappedRecipes = props.recipes.map((item) => {
        return(
            <div key={item.recipe_id}>
                <div>
                    <h1>
                        <Link to={{pathname: '/recipe-card/' + item.recipe_id}}>
                            {item.recipe_name}
                        </Link>
                    </h1>
                    {item.photo_url}<br />
                    <label>Author: </label>{item.contributor}<br />
                    <label>Prep Time: </label>{item.prep_time}<br />
                    <label>Cook Time: </label>{item.cook_time}
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
                        <div>
                            <Nav />
                        </div>
                        <div>
                            {mappedRecipes}
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
        loading: reduxState.recipe.loading
    }
}

export default connect(mapStateToProps)(MyRecipes);
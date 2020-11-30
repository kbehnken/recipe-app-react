import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import Loader from 'react-loader-spinner';
import { requestRecipeDataByUserId } from '../Redux/Actions/recipeActions';
import { getUserInfo } from '../Helpers/getUserInfo';
import Search from './Search'
import RecipeTile from './RecipeTile';
import Nav from './Nav';
import '../Styles/main.css';

function MyRecipes(props) {
    const dispatch = useDispatch();
    const user = getUserInfo();

    useEffect(() => {
       dispatch(requestRecipeDataByUserId(user.user_id));
    },[dispatch, user.user_id])

    const mappedRecipes = props.recipes.map((item) => {
        return(
            <RecipeTile  key={item.recipe_id} recipe={item} />
        );
    })
    return(
        <div>
            <div>
                <Nav />
            </div>
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
                            {mappedRecipes.length === 0 ?
                                (
                                    <p style={{textAlign: 'center'}}>
                                        You have not contributed any recipes to the recipe box. <Link to='add-recipe'>Click here</Link> to add a recipe.
                                    </p>
                                ) :
                                (
                                    <div className='flex-between-wrap'>
                                        {mappedRecipes}
                                    </div>
                                )
                            }
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

export default connect(mapStateToProps)(MyRecipes);
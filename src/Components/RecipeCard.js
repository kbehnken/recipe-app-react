import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { BsClockFill } from 'react-icons/bs';
import Loader from 'react-loader-spinner'
import { requestRecipeDataById, addFavoriteRecipeData, removeFavoriteRecipeData, clearRecipeData } from '../Redux/Actions/recipeActions';
import Nav from './Nav';
import '../Styles/main.css';
import { authHeader } from '../Helpers/authHeader'

function RecipeCard(props) {
    const dispatch = useDispatch();
    const recipe_id = parseInt(useParams().recipe_id);
    const url=`http://localhost:3000/api/v1/recipes/photos/${recipe_id}`
    const { recipe, loading } = props;
    const [src, setSrc] = useState('');
    const [imgLoading, setImgLoading] = useState(false);

    useEffect(() => {
        dispatch(requestRecipeDataById(recipe_id));

        if (src === '' && !imgLoading) {
            setImgLoading(true);
            fetch(url, {headers: authHeader()})
            .then(res => {
                return res.blob();
            })
            .then(blob => {
                setSrc(URL.createObjectURL(blob));
                setImgLoading(false);
            })
            .catch(err => {
                console.log(err);
            });  
        }

        return () => {
            dispatch(clearRecipeData());
        }
    },[dispatch, recipe_id, imgLoading, src, url])

    const mappedIngredients = props.recipe.ingredients.map((item) => {
        return (
            <div key={item.ingredient_id}>
                <div>
                   {item.quantity} {item.ingredient_name}<br />
                </div>
            </div>
        );
    })
    
    return (
        <div className='outer-content-container' key={recipe.recipe_id}>
            {loading ?
                (
                    <div>
                        <p>
                            Loading. Please wait.
                        </p>
                        <Loader type='ThreeDots' color='#00b300' height={50} width={50} timeout={5000} />
                    </div>
                ) :
                (
                    <div>
                    <div>
                        <Nav />
                    </div>
                    <div id='recipe-card'>
                        <div className='flex-between'>
                            <div>
                                <h1>
                                    {recipe.recipe_name}
                                </h1>
                            </div>
                            <div>
                                {!recipe.is_favorite ?
                                (
                                    <MdFavoriteBorder title='Add as favorite' size={30} style={{ color: 'red' }} onClick={() => props.addFavoriteRecipeData(recipe_id)} />
                                ) :
                                (
                                    <MdFavorite title='Remove from favorites' size={30} style={{ color: 'red' }} onClick={() => props.removeFavoriteRecipeData(recipe_id)} />
                                )}
                            </div>
                        </div>
                        <div>
                            <div className='flex-around'>
                                <div style={{margin: '15px 15px 15px 0px', width: '50%'}}>
                                    {recipe.photo_url ?
                                    (
                                        <img src={src} alt={recipe.recipe_name} style={{width: '100%', height: 'auto'}} />
                                    ) :
                                    (
                                        <div></div>
                                    )}
                                </div>
                                <div style={{margin: '15px 0px 15px 0px', paddingLeft: '25px', width: '50%'}}>
                                    <label>CONTRIBUTOR </label><br /><br />
                                    <span style={{fontStyle: 'italic'}}>{recipe.contributor}</span><br /><br /><br />
                                    <label>PREP <BsClockFill title='time'size={20} style={{ color: '#00b300' }} /></label><br /><br />
                                    <span style={{fontStyle: 'italic'}}>{recipe.prep_time}</span><br /><br /><br />
                                    <label>COOK <BsClockFill title='time'size={20} style={{ color: '#00b300' }} /></label><br /><br />
                                    <span style={{fontStyle: 'italic'}}>{recipe.cook_time}</span>
                                </div>
                            </div>
                            <div style={{textAlign: 'center', margin: '15px 0px 15px 0px'}}>
                                <label>INGREDIENTS</label>
                            </div>
                            <div style={{fontStyle: 'italic'}}>
                                {mappedIngredients}
                            </div>
                            <div style={{textAlign: 'center', marginBottom: '15px'}}>
                                <label>DIRECTIONS </label>
                            </div>
                            <div style={{fontStyle: 'italic', width: '80%', margin: 'auto'}}>
                                {recipe.directions}
                            </div>
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
        recipe: reduxState.recipe.recipe,
        loading: reduxState.recipe.loading
    }
}

export default connect(mapStateToProps, { requestRecipeDataById, addFavoriteRecipeData, removeFavoriteRecipeData })(RecipeCard);
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { MdEdit, MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { FaCamera } from 'react-icons/fa';
import { BsClockFill } from 'react-icons/bs';
import Loader from 'react-loader-spinner';
import { requestRecipeDataById, addFavoriteRecipeData, removeFavoriteRecipeData, clearRecipeData } from '../Redux/Actions/recipeActions';
import { authHeader } from '../Helpers/authHeader';
import { getUserInfo } from '../Helpers/getUserInfo';
import Header from './Header';

function RecipeCard(props) {
    const dispatch = useDispatch();
    const { user_id } = getUserInfo();
    const recipe_id = parseInt(useParams().recipe_id);
    const url=`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api/v1/recipes/photos/${recipe_id}`;
    const { recipe, loading } = props;
    const [src, setSrc] = useState('');
    const [imgFetched, setImgFetched] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);

    useEffect(() => {
        dispatch(requestRecipeDataById(recipe_id));
        if (!imgFetched && !imgLoading) {
            setImgLoading(true);
            fetch(url, {headers: authHeader()})
            .then(async res => {
                if (res.status === 200) {
                    setSrc(URL.createObjectURL(await res.blob()));
                }
                setImgLoading(false);
                setImgFetched(true);
            })
            .catch(err => {
                console.log(err);
            });  
        }

        return () => {
            dispatch(clearRecipeData());
        }
    },[dispatch, recipe_id, imgLoading, imgFetched, src, url])

    const mappedIngredients = recipe.ingredients.map((item) => {
        return (
            <div key={item.ingredient_id}>
                <div>
                   {item.quantity} {item.ingredient_name}<br />
                </div>
            </div>
        );
    })
    
    return (
        <div>
            <Header />
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
                            <div id='recipe-card'>
                                <div className='flex-between'>
                                    <div>
                                        <h1>
                                            {recipe.recipe_name}
                                        </h1>
                                    </div>
                                    <div>
                                        <div>
                                            {
                                                (user_id === recipe.user_id) &&
                                                <div className='float-left' style={{marginRight: '10px'}}>
                                                    <Link to={'/update-recipes/' + recipe_id}>
                                                        <MdEdit title='Edit recipe' size={30} style={{ color: '#00b300' }} />
                                                    </Link>
                                                </div>
                                            }
                                            {!recipe.is_favorite ?
                                                (
                                                    <div className='float-left'>
                                                        <MdFavoriteBorder title='Love this recipe? Click to add it to your favorites!' size={30} style={{ color: 'red' }} onClick={() => props.addFavoriteRecipeData(recipe_id)} />
                                                    </div>
                                                ) :
                                                (
                                                    <MdFavorite title='Remove from favorites' size={30} style={{ color: 'red' }} onClick={() => props.removeFavoriteRecipeData(recipe_id)} />
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='flex-around'>
                                        <div style={{margin: '15px 15px 15px 0px', width: '50%'}}>
                                            {src ?
                                                (
                                                    <div>
                                                        <img src={src} alt={recipe.recipe_name} style={{borderRadius: '5px', width: '100%', height: 'auto'}} />
                                                    </div>
                                                ) :
                                                (
                                                    <div style={{borderRadius: '5px', backgroundColor: '#dddddd', color: '#9a9a9a', textAlign: 'center', padding: '10px', fontWeight: '700', fontSize: '18pt'}}>
                                                        <FaCamera title='No photo available' size={100} style={{ color: '#9a9a9a' }} /><br /><br/>
                                                        NO PHOTO AVAILABLE
                                                    </div>
                                                )
                                            }
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
                                    <div style={{fontStyle: 'italic', paddingBottom: '25px'}}>
                                        {mappedIngredients}
                                    </div>
                                    <div style={{textAlign: 'center', marginBottom: '15px'}}>
                                        <label>DIRECTIONS </label>
                                    </div>
                                    <div className='directions'>
                                        {recipe.directions}
                                    </div>
                                </div>
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
        recipe: reduxState.recipe.recipe,
        loading: reduxState.recipe.loading
    }
}

export default connect(mapStateToProps, { requestRecipeDataById, addFavoriteRecipeData, removeFavoriteRecipeData })(RecipeCard);
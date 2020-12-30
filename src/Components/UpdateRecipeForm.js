import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { CgAddR, CgRemoveR } from 'react-icons/cg';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import { requestRecipeDataById, updateStoredRecipeData, updateActiveRecipeData, clearRecipeData, addIngredientData, removeIngredientData } from '../Redux/Actions/recipeActions';
import { authHeader } from '../Helpers/authHeader';
import Nav from './Nav';

function UpdateRecipeForm(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const recipe_id = parseInt(useParams().recipe_id);
    const url=`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api/v1/recipes/photos/${recipe_id}`;
    const [src, setSrc] = useState('');
    const [quantity, setQuantity] = useState('');
    const [ingredient_name, setIngredientName] = useState('');
    const [imgLoading, setImgLoading] = useState(false);
    const { recipe, loading, updateActiveRecipeData } = props;
    const ImageThumbnail = ({image}) => {
        return <img src={URL.createObjectURL(image)} alt='' height='100px' />;
    };
    const addIngredient = (() => {
        if (quantity && ingredient_name) {
            props.addIngredientData(ingredient_name, quantity);
            setIngredientName('');
            setQuantity('');
        }
    })
    const handleSubmit = function() {
        if (recipe.recipe_name && recipe.prep_time && recipe.cook_time) {
            dispatch(updateStoredRecipeData())
            .then(() => {
                toast.success(`You successfully updated your ${recipe.recipe_name} recipe.`);
                history.goBack();
            })
            .catch(err => {
                toast.error('There was an error updating your recipe.')
            })
        } else {
            toast.error('Please complete all required fields.')
        }
    }

    useEffect(() => {
        dispatch(requestRecipeDataById(recipe_id));
        if (src === '' && !imgLoading) {
            setImgLoading(true);
            fetch(url, {headers: authHeader()})
            .then(async res => {
                if (res.status === 200) {
                    setSrc(URL.createObjectURL(await res.blob()));
                    setImgLoading(false);}
            })
            .catch(err => {
                console.log(err);
            });  
        }
        return () => {
            dispatch(clearRecipeData());
        }
    },[dispatch, recipe_id, imgLoading, src, url])

    const mappedIngredients = recipe.ingredients.map((item, index) => {
        return (
            <div className='flex-between' style={{backgroundColor: '#eee', padding: '10px', alignItems: 'center'}} key={index}>
                <div>
                   {item.quantity} {item.ingredient_name}
                </div>
                <div>
                    <CgRemoveR title={`Delete ingredient: ${item.ingredient_name}`} size={20} style={{ color: '#00b300', cursor: 'pointer' }} onClick={() => props.removeIngredientData(index)} />
                </div>
            </div>
        );
    })

    return (
        <div>
            <Nav />
            <div className='outer-content-container'>
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
                            <p>
                                &nbsp;
                            </p>
                            <form className='form-container'>
                                <div>
                                    <TextField {...(!recipe.recipe_name && {error: true, helperText: 'Recipe name cannot be blank.' })} required name='recipe_name' variant='outlined' label='Recipe Name' autoFocus={true} style={{width: '100%'}} onChange={e => props.updateActiveRecipeData(e.target.name, e.target.value)} value={recipe.recipe_name} />
                                </div>
                                <div>
                                    <label>Upload Photo:</label>
                                </div>
                                <div>
                                    {/* <Button type='file' name='imageFile' variant='contained' onChange={e => updateActiveRecipeData(e.target.name, e.target.files[0])}>
                                        Choose File
                                    </Button> */}
                                    <input type='file' name='imageFile' onChange={e => updateActiveRecipeData(e.target.name, e.target.files[0])} /><br /><br />
                                    {recipe.imageFile ? 
                                        (
                                            <ImageThumbnail image={recipe.imageFile} />
                                        ) :
                                        (
                                            src ?
                                                <div>
                                                    <img src={src} alt={recipe.recipe_name} style={{borderRadius: '5px', width: '150px'}} />
                                                </div>
                                            :
                                                <div>

                                                </div>
                                        )
                                    }
                                </div>
                                <div>
                                    <TextField {...(!recipe.prep_time && {error: true, helperText: 'Prep time cannot be blank.' })} required name='prep_time' variant='outlined' label='Prep Time' style={{marginRight: '10px'}} onChange={e => props.updateActiveRecipeData(e.target.name, e.target.value)} value={recipe.prep_time} />
                                    <TextField {...(!recipe.cook_time && {error: true, helperText: 'Cook time cannot be blank.' })} required name='cook_time' variant='outlined' label='Cook Time' onChange={e => props.updateActiveRecipeData(e.target.name, e.target.value)} value={recipe.cook_time} />
                                </div>
                                <div>
                                    <label>Add / Remove Ingredients:</label>
                                </div>
                                <div>
                                    <TextField name='quantity' variant='outlined' label='Quantity' style={{ marginRight: '10px' }} onChange={e => setQuantity(e.target.value)} value={quantity} />
                                    <TextField name='ingredient' variant='outlined' label='Ingredient' onChange={e => setIngredientName(e.target.value)} value={ingredient_name} />
                                    <CgAddR title='Add an ingredient' size={60} style={{ color: '#00b300', cursor: 'pointer' }} onClick={() => {addIngredient()}} />
                                </div>
                                <div style={{paddingBottom: '15px'}}>
                                    {mappedIngredients}
                                </div>
                                <div>
                                    <TextField name='directions' label='Directions' multiline rows={5} variant='outlined' style={{width: '100%'}} onChange={e => props.updateActiveRecipeData(e.target.name, e.target.value)} value={recipe.directions || ''} />
                                </div>
                                <div>
                                    <button type='button' onClick={history.goBack}>
                                        Cancel
                                    </button>
                                    <button type='button' onClick={handleSubmit}>
                                        Save
                                    </button>
                                </div>
                            </form>
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

export default connect(mapStateToProps, { updateStoredRecipeData, updateActiveRecipeData, clearRecipeData, addIngredientData, removeIngredientData })(UpdateRecipeForm);
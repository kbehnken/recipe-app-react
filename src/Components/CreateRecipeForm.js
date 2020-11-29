import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CgAddR, CgRemoveR } from 'react-icons/cg';
import { NotificationManager } from 'react-notifications';
import { addRecipeData, updateActiveRecipeData, clearRecipeData, addIngredientData, removeIngredientData } from '../Redux/Actions/recipeActions';
import TextField from '@material-ui/core/TextField';
import Nav from './Nav';
import '../Styles/main.css';

function CreateRecipeForm(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [quantity, setQuantity] = useState('');
    const [ingredient_name, setIngredientName] = useState('');
    const { recipe } = props;
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
            dispatch(addRecipeData())
            .then(() => {
                NotificationManager.success(`You successfully added ${recipe.recipe_name} to the recipe box.`);
                dispatch(clearRecipeData());
                history.push('/');
            })
            .catch(err => {
                if (err && err.response.status === 415) {
                    NotificationManager.error('Files must be in .jpg, .png, or .gif format');
                } else {
                NotificationManager.error('There was an error submitting your recipe.')
                }
            })
        } else {
            NotificationManager.error('Please complete all required fields.')
        }
    }
    const mappedIngredients = recipe.ingredients.map((item, index) => {
        return (
            <div className='flex-between' style={{backgroundColor: '#eee', padding: '10px'}} key={index}>
                <div>
                   {item.quantity} {item.ingredient_name}
                </div>
                <div>
                    <CgRemoveR title={`Delete ingredient: ${item.ingredient_name}`} size={20} style={{ color: '#00b300', cursor: 'pointer' }} onClick={() => props.removeIngredientData(index)} />
                </div>
            </div>
        );
    })

    return(
        <div>
            <div>
                <Nav />
            </div>
            <div className='outer-content-container'>
                <p style={{textAlign: 'center'}}>
                    Fill out the form below and click the Add button to add a new recipe to the recipe box.<br /><br />
                </p>
                <div className='form-container'>
                    <div>
                        <TextField {...(!recipe.recipe_name && {error: true, helperText: 'Recipe name cannot be blank.' })} required name='recipe_name' variant='outlined' label='Recipe Name' autoFocus={true} style={{width: '100%'}} onChange={e => props.updateActiveRecipeData(e.target.name, e.target.value)} value={recipe.recipe_name} />
                    </div>
                    <div>
                        <label>Upload Photo:</label>
                    </div>
                    <div>
                        <input id='imageFile' type='file' name='imageFile' onChange={e => props.updateActiveRecipeData(e.target.name, e.target.files[0])} /><br /><br />
                        {recipe.imageFile && <ImageThumbnail image={recipe.imageFile} />}<br /><br />
                    </div>
                    <div>
                        <TextField {...(!recipe.prep_time && {error: true, helperText: 'Prep time cannot be blank.' })} required name='prep_time' variant='outlined' label='Prep Time' style={{marginRight: '10px'}} onChange={e => props.updateActiveRecipeData(e.target.name, e.target.value)} value={recipe.prep_time} />
                        <TextField {...(!recipe.cook_time && {error: true, helperText: 'Cook time cannot be blank.' })} required name='cook_time' variant='outlined' label='Cook Time' onChange={e => props.updateActiveRecipeData(e.target.name, e.target.value)} value={recipe.cook_time} />
                    </div>
                    <div>
                        <label>Add Ingredients:</label>
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
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(reduxState) {
    return {
        recipe: reduxState.recipe.recipe
    }
}

export default connect(mapStateToProps, { addRecipeData, updateActiveRecipeData, clearRecipeData, addIngredientData, removeIngredientData })(CreateRecipeForm);
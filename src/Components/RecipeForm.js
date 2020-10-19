import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { CgAddR, CgRemoveR } from 'react-icons/cg';
import { addRecipeData, updateActiveRecipeData, clearRecipeData, addIngredientData, removeIngredientData } from '../Redux/Actions/recipeActions';
import '../Styles/main.css'
import { Link } from 'react-router-dom';

function RecipeForm(props) {
    const dispatch = useDispatch();
    const [ingredient_name, setIngredientName] = useState('');
    const [quantity, setQuantity] = useState('');
    const { recipe } = props;
    const ImageThumbnail = ({image}) => {
        return <img src={URL.createObjectURL(image)} alt='' height='100px' />;
    };
    const mappedIngredients = recipe.ingredients.map((item, index) => {
        return (
            <div className='flex-parent-container' key={index}>
                <div>
                   {item.quantity} {item.ingredient_name}<br />
                </div>
                <div>
                    <CgRemoveR title={`Delete ingredient: ${item.ingredient_name}`} size={20} style={{ color: '#00b300' }} onClick={() => props.removeIngredientData(index)} />
                </div>
            </div>
        );
    })

    return (
        <div id='outer-content-container'>
            <p>
                Fill out the form below and click the Add button to add a new recipe to the recipe box.
            </p>
            <div className='recipe-form'>
                <div>
                    <label>Recipe Name:</label>
                </div>
                <div>
                    <input type='text' name='recipe_name' onChange={e => props.updateActiveRecipeData(e.target.name, e.target.value)} value={recipe.recipe_name} />
                </div>
                <div>
                    <label>Upload Photo:</label>
                </div>
                <div>
                    <input type='file' name='imageFile' onChange={e => props.updateActiveRecipeData(e.target.name, e.target.files[0])} />
                    {recipe.imageFile && <ImageThumbnail image={recipe.imageFile} />}
                </div>
                <div>
                    <label>Prep Time:</label>
                </div>
                <div>
                    <input type='text' name='prep_time' onChange={e => props.updateActiveRecipeData(e.target.name, e.target.value)} value={recipe.prep_time} />
                </div>
                <div>
                    <label>Cook Time:</label>
                </div>
                <div>
                    <input type='text' name='cook_time' onChange={e => props.updateActiveRecipeData(e.target.name, e.target.value)} value={recipe.cook_time} />
                </div>
                <div>
                    <label>Add Ingredients:</label>
                </div>
                <div className='flex-parent-container'>
                    <label>Quantity: </label>
                    <label>Name: </label>
                </div>
                <div className='flex-parent-container'>
                    <input type='text' name='quantity' onChange={e => setQuantity(e.target.value)} value={quantity} />
                    <input type='text' name='ingredient' onChange={e => setIngredientName(e.target.value)} value={ingredient_name} /><br />
                    <CgAddR title='Add an ingredient' size={50} style={{ color: '#00b300' }} onClick={() => {
                        props.addIngredientData(ingredient_name, quantity);
                        setIngredientName('');
                        setQuantity('');
                    }} />
                </div>
                <div>
                    {mappedIngredients}
                </div>
                <div>
                    <label>Directions:</label>
                </div>
                <div>
                    <textarea type='text' name='directions' cols='60' rows='5' onChange={e => props.updateActiveRecipeData(e.target.name, e.target.value)} value={recipe.directions} />
                </div>
                <div>
                    <Link to='/'>
                        <button type='button'>
                            Cancel
                        </button>
                    </Link>
                    <button type='button' onClick={() => props.addRecipeData().then(dispatch(clearRecipeData()))}>
                        Add
                    </button>
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

export default connect(mapStateToProps, { addRecipeData, updateActiveRecipeData, clearRecipeData, addIngredientData, removeIngredientData })(RecipeForm);
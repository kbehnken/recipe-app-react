import React from 'react';
import { Link } from 'react-router-dom';
import RecipeTile from './RecipeTile';
import PaddingTile from './PaddingTile';

function RecipeList(props) {
    const cols = 3;
    const mappedRecipes = props.recipes.map((item) => {
        return (
            <RecipeTile key={item.recipe_id} recipe={item} />
        );
    })

    const padding = (() => {
        if (mappedRecipes.length % cols === 0) {
            return 0
        }
        return cols - (mappedRecipes.length % cols);
    })()
    for(let i = 0; i <= padding; i++) {
        mappedRecipes.push(<PaddingTile key={i} />)
    }

    return(
        <div>
            {mappedRecipes.length === 0 ?
                (
                    <p style={{textAlign: 'center'}}>
                        You have no recipes to display. <Link to='all-recipes'>Click here</Link> to browse all recipes.
                    </p>
                ) :
                (
                    <div>
                        <div className='flex-between flex-wrap'>
                            {mappedRecipes}
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default RecipeList
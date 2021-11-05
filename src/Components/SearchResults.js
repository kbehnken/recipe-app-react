import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RecipeTile from './RecipeTile';
import Header from './Header';

function SearchResults(props) {
    const mappedRecipes = props.recipes.map((item) => {
        return (
            <RecipeTile  key={item.recipe_id} recipe={item} />
        );
    })
    
    return(
        <div>
            <Header />
            <div className='outer-content-container'>
                <div>
                    {mappedRecipes.length === 0 ?
                        (
                            <p>There are no recipes that match your search criteria. <Link to='all-recipes'>Click here</Link> to browse all recipes.</p>
                        ) :
                        (
                            <div>
                                {mappedRecipes}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(reduxState) {
    return {
        recipes: reduxState.recipe.searchResults
    }
}

export default connect(mapStateToProps)(SearchResults);
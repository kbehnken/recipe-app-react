import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from './Nav';
import '../Styles/main.css';

function SearchResults(props) {
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
    
    return(
        <div className='outer-content-container'>
            <div>
                <div>
                    <Nav />
                </div>
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
    );
}

function mapStateToProps(reduxState) {
    return {
        recipes: reduxState.recipe.searchResults
    }
}

export default connect(mapStateToProps)(SearchResults);
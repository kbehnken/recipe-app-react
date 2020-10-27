import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import { getSearchResults } from '../Redux/Actions/recipeActions';

function Search(props) {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div>
            <input type='text' name='search' placeholder='Search all recipes' value={search} onChange={e => setSearch(e.target.value)} />
            <button onClick={() => {
                dispatch(getSearchResults(search))
                .then(history.push('/search-results'));
            }}>
                Search
            </button>
        </div>
    )
}

function mapStateToProps(reduxState) {
    return {
        loading: reduxState.recipe.loading
    }
}

export default connect(mapStateToProps)(Search);
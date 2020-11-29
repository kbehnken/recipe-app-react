import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux';
import { BsSearch } from 'react-icons/bs';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { getSearchResults } from '../Redux/Actions/recipeActions';

function Search() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <div className='form-container'>
            <TextField variant='outlined' label='Search all recipes' onKeyPress={e => {
                if (e.key === 'Enter') {
                    dispatch(getSearchResults(search))
                    .then(history.push('/search-results'));
                }
            }} onChange={e => setSearch(e.target.value)} InputProps={{
                endAdornment:
                <InputAdornment position='end'>
                    <BsSearch title='search' size={20} style={{cursor: 'pointer', color: '#00b300'}} onClick={() => {
                        dispatch(getSearchResults(search))
                        .then(history.push('/search-results'));
                    }} />
                </InputAdornment>
            }} />
        </div>
    )
}

function mapStateToProps(reduxState) {
    return {
        loading: reduxState.recipe.loading
    }
}

export default connect(mapStateToProps)(Search);
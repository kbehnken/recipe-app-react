import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import { authHeader } from '../Helpers/authHeader';

function RecipeTile(props) {
    const { recipe_id, recipe_name, contributor, prep_time, cook_time } = props.recipe;
    const url=`${process.env.REACT_APP_API_PROTOCOL}${process.env.REACT_APP_API_SERVER}:${process.env.REACT_APP_API_PORT}/api/v1/recipes/photos/${recipe_id}`;
    const [src, setSrc] = useState('');
    //const [imgFetched, setImgFetched] = useState(false);
    //const [imgLoading, setImgLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        let imgFetched = false;
        let imgLoading = false;
        if (!imgFetched && !imgLoading) {
            imgLoading = true;
            fetch(url, {headers: authHeader()})
            .then(async res => {
                if (mounted) {
                    if (res.status === 200) {
                        setSrc(URL.createObjectURL(await res.blob()));
                    }
                    //setImgLoading(false);
                    //setImgFetched(true);
                    imgLoading = false
                    imgFetched = true
                }
            })
            .catch(err => {
                console.log(err);
            });  
        }
        return () => mounted = false;
    },[recipe_id, setSrc, url])

    return (
        <div>
            <Link to={{pathname: '/recipe-card/' + recipe_id}} style={{color: '#424242'}}>
                <div className='recipe-tile'>
                    <div>
                        {src ?
                            (
                                <img src={src} alt={recipe_name} style={{width: '100%', height: 'auto'}} />
                            ) :
                            (
                                <div style={{backgroundColor: '#dddddd', color: '#9a9a9a', borderRadius: '5px', textAlign: 'center', padding: '10px', fontWeight: '700', fontSize: '18pt'}}>
                                    <FaCamera title='No photo available' size={100} style={{ color: '#9a9a9a' }} /><br /><br/>
                                    NO PHOTO AVAILABLE
                                </div>
                            )
                        }
                    </div>
                    <h2>
                        {/* <Link to={{pathname: '/recipe-card/' + recipe_id}}>
                            {recipe_name}
                        </Link> */}
                        <p>{recipe_name}</p>
                    </h2>
                    Contributed by {contributor}<br />
                    Prep time {prep_time}<br />
                    Cook time {cook_time}<br />
                </div>
            </Link>
        </div>
    );
}

export default RecipeTile;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCamera } from 'react-icons/fa';
import { authHeader } from '../Helpers/authHeader';

function RecipeTile(props) {
    const { recipe_id, recipe_name, photo_url, contributor, prep_time, cook_time } = props.recipe;
    const url=`http://localhost:3000/api/v1/recipes/photos/${recipe_id}`;
    const [src, setSrc] = useState('');
    const [imgLoading, setImgLoading] = useState(false);

    useEffect(() => {
        if (src === '' && !imgLoading) {
            setImgLoading(true);
            fetch(url, {headers: authHeader()})
            .then(res => {
                return res.blob();
            })
            .then(blob => {
                setSrc(URL.createObjectURL(blob));
                setImgLoading(false);
            })
            .catch(err => {
                console.log(err);
            });  
        }
    },[recipe_id, imgLoading, src, url])

    return (
        <div>
            <div className='recipe-tile'>
                <div>
                    {photo_url ?
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
                    <Link to={{pathname: '/recipe-card/' + recipe_id}}>
                        {recipe_name}
                    </Link>
                </h2>
                Contributed by {contributor}<br />
                Prep time {prep_time}<br />
                Cook time {cook_time}<br />
            </div>
        </div>
    );
}

export default RecipeTile;
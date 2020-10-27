import React, { useEffect, useState } from 'react';
import { authHeader } from '../Helpers/authHeader';

function LoadPhoto(props) {
    const { url, alt } = props;
    const [src, setSrc] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (src === '' && !loading) {
            setLoading(true);
            fetch(url, {headers: authHeader()})
            .then(res => {
                setSrc(res.blob());
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });  
        }
    })

    return (
       <img src={src} alt={alt} />
    );
  }
  
  export default LoadPhoto;
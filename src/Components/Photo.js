import React, { useState, useEffect } from 'react';
import './Photo.scss';
import cancel from '../Assets/cancel.svg';

const Photo = (props) => {
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [photo, setPhoto] = useState([]);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos/${props.match.params.id}`)
            .then(response => response.json())
            .then(
                (result) => {
                    setPhoto(result);
                    setLoaded(true);
                },
                (error) => {
                    setError(error);
                    setLoaded(true);
                }
            );
    }, [props.match.params.id]);

    if (loaded && !error) {
        return (
            <div>
                <BackButton history={props.history} />
                <div className="container">
                    <img id="photo" src={photo.url} />
                    <div id="photoData">
                        <h2>Author:</h2>
                        <p>{photo.author}</p>
                        <h2>Photo id:</h2>
                        <p>{photo.id}</p>
                        <h2>Title:</h2>
                        <p>{photo.title}</p>
                    </div>
                </div>
            </div>
        )
    } else {
        return <p>Error</p>
    }
}

function BackButton(props) {
    return (
        <div className="closeButton">
            <button onClick={() => props.history.push('/')}><img src={cancel} /></button>
        </div>
    )
}

export default Photo;
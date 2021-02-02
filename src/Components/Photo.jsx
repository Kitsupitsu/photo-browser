import React, { useState, useEffect, memo } from 'react';
import './Photo.scss';
import cancel from '../Assets/cancel.svg';
import Loading from './Loading';

const Photo = memo((props) => {
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

    if (loaded) {
        return (
            <div>
                <BackButton history={props.history} />
                <div className="container">
                    <img id="photo" src={photo.url} aria-label={"Picture with the id " + photo.id} />
                    <div id="photoData">
                        <h1>Album:</h1>
                        <p>{photo.albumId}</p>
                        <h1>Photo id:</h1>
                        <p>{photo.id}</p>
                        <h1>Title:</h1>
                        <p>{photo.title}</p>
                    </div>
                </div>
            </div>
        )
    } else if (error) {
        console.log(error);
        return (<p>Error</p>)
    } else {
        return <Loading/>
    }
})

function BackButton(props) {
    return (
        <div className="closeButton">
            <button onClick={() => props.history.push('/')}><img src={cancel} aria-label={"Move backwards to the front page"} /></button>
        </div>
    )
}

export default Photo;
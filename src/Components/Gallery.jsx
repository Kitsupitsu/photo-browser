import React from 'react';
import './Gallery.scss';
import { Link } from "react-router-dom";

const Gallery = (props) => {
    const photos = props.photos

    return (
        <div className="galleryGrid">
            {photos.map(photo => (
                <div id={"galleryImage-" + photo.id} key={photo.id} aria-label={"Move to photo" + photo.id}>
                    <Link to={`/photo/${photo.id}`}>
                        <img src={photo.thumbnailUrl} aria-label={"Photo id " + photo.id}/>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Gallery;
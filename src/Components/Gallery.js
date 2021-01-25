import React from 'react';
import './Gallery.scss';
import { Link } from "react-router-dom";

const Gallery = (props) => {
    const photos = props.photos
    return (
        <div className="galleryGrid">
            {photos.map(photo => (
                <div id="galleryImage" key={photo.id}>
                    <Link to={`/photo/${photo.id}`}>
                        <img src={photo.thumbnailUrl} />
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default Gallery;
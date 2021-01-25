import React, { Component } from 'react';
import './Gallery.scss';
import { Link } from "react-router-dom";

class Gallery extends Component {
    render() {
        const photos = this.props.photos
        return (
            <div className="galleryGrid">
                {photos.map(photo => (
                    <div id="galleryImage" key={photo.id}>
                        <Link to={`/${photo.id}`}>
                            <img src={photo.thumbnailUrl} />
                        </Link>
                    </div>
                ))}
            </div>
        )
    }
}

export default Gallery;
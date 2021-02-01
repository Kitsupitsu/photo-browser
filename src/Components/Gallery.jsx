import React, { useState } from 'react';
import './Gallery.scss';
import { Link } from "react-router-dom";

const Gallery = (props) => {
    const photos = props.photos;
    const [filter, setFilter] = useState("");

    const filterPictures = (event) => {
        setFilter(event.target.value);
    }

    const filteredPictures = photos.filter(item => {
        return Object.keys(item).some(key => 
            item[key].toString().includes(filter))
    });

    return (
        <>
        <input id="input" value={filter} onChange={filterPictures} />
        <div className="galleryGrid">
            {filteredPictures.map(photo => (
                <div id={"galleryImage-" + photo.id} key={photo.id} aria-label={"Move to photo" + photo.id}>
                    <Link to={`/photo/${photo.id}`}>
                        <img src={photo.thumbnailUrl} aria-label={"Photo id " + photo.id}/>
                    </Link>
                </div>
            ))}
        </div>
        </>
    )
}

export default Gallery;
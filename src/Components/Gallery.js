import React, { Component } from 'react';
import './Gallery.scss';

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loaded: false,
            photos: []
        };
    }

    componentDidMount() {
        fetch('https://picsum.photos/v2/list')
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({ loaded: true, photos: result });
                },
                (error) => {
                    this.setState({ loaded: true, error })
                }
            );
    }


    render() {
        const { error, loaded, photos } = this.state;
        if (error) {
            <div id="errorPage">

            </div>
        } else if (loaded) {
            return (
                <div class="galleryGrid">
                    {photos.map(photo => (
                        <div id="galleryImage">
                        <img key={photo.id} src={photo.download_url}/>
                        </div>
                    ))}
                </div>
            )
        } else {
            return (
                <h1>Loading</h1>
            )
        }
    }

}

export default Gallery;
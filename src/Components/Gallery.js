import React, { Component } from 'react';

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
        fetch('http://jsonplaceholder.typicode.com/photos')
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
            <p>{error}</p>
        } else if (loaded) {
            return (
                <div id="test">
                    {photos.map(photo => (
                        <img key={photo.id} src={photo.thumbnailUrl}/>
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
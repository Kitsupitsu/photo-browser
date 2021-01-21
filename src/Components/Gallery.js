import React, { Component } from 'react';
import './Gallery.scss';
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import Photo from './Photo';

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
            console.log(error)
            return (
                <div id="errorPage">
                    <h1>Error!</h1>
                </div>
            )
        } else if (loaded) {
            return (
                <div>
                    <Router>
                        <div className="galleryGrid">
                            {photos.map(photo => (
                                <div id="galleryImage" key={photo.id}>
                                    <NavLink to={`/photos/${photo.id}`} id={photo.id}>
                                        <img src={photo.thumbnailUrl} />
                                    </NavLink>
                                    <Route path={`/photos/${photo.id}`} render={(props) => <Photo {...props} id={photo.id} />} />
                                </div>
                            ))}
                        </div>
                    </Router>
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
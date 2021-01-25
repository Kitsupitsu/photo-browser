import React, { Component } from 'react';
import './Photo.scss';
import cancel from '../Assets/cancel.svg';

class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loaded: false,
            photo: []
        };
    }

    componentDidMount() {
        fetch(`https://picsum.photos/id/${this.props.match.params.id}/info`)
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({ loaded: true, photo: result });
                },
                (error) => {
                    this.setState({ loaded: true, error })
                }
            );

    }

    render() {
        const { error, loaded, photo } = this.state;
        if (loaded && !error) {
            return (
                <div>
                    {this.backButton()};
                    <div className="container">
                        <img id="photo" src={photo.download_url} />
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

    backButton() {
        return (
            <div className="closeButton">
                <img src={cancel} />
            </div>
        )
    }
}

export default Photo;
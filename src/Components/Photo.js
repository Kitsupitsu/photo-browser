import React, { Component } from 'react';
import './Photo.scss';

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
        fetch(`http://jsonplaceholder.typicode.com/photos/${this.props.match.params.id}`)
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
                    <img src={photo.url} />
                </div>
            )
        } else {
            return <p>Error</p>
        }
    }
}

export default Photo;
import react, { Component } from 'react';

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
        fetch(`http://jsonplaceholder.typicode.com/photos/${this.props.id}`)
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

        if (loaded && photo) {
            console.log(photo);
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
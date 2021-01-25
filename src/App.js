import React, { Component } from 'react';
import Gallery from './Components/Gallery';
import Photo from './Components/Photo';
import { BrowserRouter as Router, Route, BrowserHistory } from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loaded: false,
            photos: [],
            page: 1
        };
    }

    componentDidMount() {
        fetch(`https://picsum.photos/v2/list?_page=${this.state.page}&_limit=60`)
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
                        <Route path="/" render={(props) => <Gallery {...props} photos={photos} />} exact />
                        <Route path="/:id" render={(props) => <Photo {...props} />}/>
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

export default App;
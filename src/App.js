import React, { Component } from 'react';
import Gallery from './Components/Gallery';
import Photo from './Components/Photo';
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";

class App extends Component {
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
                        <Route path="/" component={ Gallery } pictures={ this.state.photos }/>
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
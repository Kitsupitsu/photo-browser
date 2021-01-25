import React, { useState, useEffect } from 'react';
import Gallery from './Components/Gallery';
import Photo from './Components/Photo';
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => {
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/photos?_page=1&_limit=120`)
            .then(response => response.json())
            .then(
                (result) => {
                    setPhotos(result);
                    setLoaded(true);
                },
                (error) => {
                    setError(error);
                    setLoaded(true);
                }
            );
    }, [photos]);

    if (error) {
        console.log(error)
        return (
            <div id="errorPage">
                <h1>Error!</h1>
            </div>
        )
    } else if (loaded) {
        return (
            <>
                <header>

                </header>
                <Router>
                    <main>
                        <Route path="/" render={(props) => <Gallery {...props} photos={photos} />} exact />
                        <Route path="/photo/:id" render={(props) => <Photo {...props} />} />
                    </main>
                </Router>
            </>
        )
    } else {
        return (
            <h1>Loading</h1>
        )
    }
}

export default App;
import React, { useState, useEffect, lazy, Suspense, Fragment } from 'react';
import { BrowserRouter as Router, Route, useLocation, withRouter } from "react-router-dom";
import Pagination from '@material-ui/lab/Pagination';

const Gallery = lazy(() => import('./Components/Gallery'));
const Photo = lazy(() => import('./Components/Photo'));
const Header = lazy(() => import('./Components/Header'));

const App = () => {
    const limit = 120;
    const [error, setError] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [page, setPage] = useState(1);
    const [photos, setPhotos] = useState([]);
    const [maxPages, setMaxPages] = useState(1);

    useEffect(page => {
        loadPhotos(page);
    });

    const loadPhotos = () => {
        fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`)
            .then(response => {
                for (var pair of response.headers.entries()) {
                    if (pair[0] === "x-total-count") {
                        setMaxPages(Math.ceil(pair[1] / limit));
                    }
                }
                return response.json()
            })
            .then(
                (result) => {
                    setPhotos([...result]);
                    setLoaded(true);
                },
                (error) => {
                    setError(error);
                    setLoaded(true);
                }
            );
    }

    const handlePageChange = (event, value) => {
        setPage(value);
        loadPhotos(page);
    }

    const Head = () => {
        return (
            <>
                <Header />
                <Pagination id="pagination" count={maxPages} onChange={handlePageChange} variant="outlined" color="standard" />
            </>
        )
    }

    if (error) {
        console.log(error)
        return (
            <div id="errorPage">
                <h1>Error!</h1>
            </div>
        )
    } else if (loaded) {
        return (
            <Suspense fallback={<h1>Loading</h1>}>
                <Router>
                    <main>
                        <Route path="/" render={(props) => <Head />} exact />
                        <Route path="/" render={(props) => <Gallery {...props} photos={photos} />} exact />
                        <Route path="/photo/:id" render={(props) => <Photo {...props} />} />
                    </main>
                </Router>

            </Suspense>
        )
    } else {
        return (
            <h1>Loading</h1>
        )
    }
}



export default withRouter(App);
import React from 'react';
import Pulse from '../Assets/Pulse.gif'
import './Loading.scss';

const Loading = () => {
    return (
    <div id="loading">
        <img aria-label={"Loading"} src={Pulse} />
    </div> )
}

export default Loading;
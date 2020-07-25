import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {

    return (
        <div>
            <h1>Home page</h1>
            <Link to='/charts'>Charts Page</Link>
        </div>
    )
}
export default HomePage;
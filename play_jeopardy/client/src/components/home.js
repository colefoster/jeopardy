import React from 'react';
import { Link } from 'react-router-dom';

function Home(){
    return (
        <div>
            <h1>Home</h1>
            <nav>
                <ul>
                <li>
                    <Link to="/questions"><h2>Browse Questions</h2></Link>
                </li>
                <li>
                    <Link to="/categories"><h2>Browse Categories</h2></Link>
                </li>
                </ul>
            </nav>
        </div>
    );
}

export default Home;
import React from 'react';
import { Link } from 'react-router-dom';

function Home(){
    return (
        <div>
            <h1>Home</h1>
            <nav>
                    <Link to="/play"><h1>Play Jeopardy</h1></Link>

                
                    <Link to="/questions"><h3>Questions Search</h3></Link>
                
                    <Link to="/categories"><h3>Categories Search</h3></Link>
                
                    
                
            </nav>
        </div>
    );
}

export default Home;
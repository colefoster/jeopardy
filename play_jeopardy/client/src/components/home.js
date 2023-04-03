import React from 'react';
import { Link } from 'react-router-dom';

function Home(){
    return (
        <div>
            <h1>Home</h1>
            <nav>
                    <Link to="/play"><h1>Play Jeopardy</h1></Link>
                    <hr/>
                    <Link to="/questions"><h3>View Questions</h3></Link> 
                    <Link to="/categories"><h3>View Categories</h3></Link>
                    <hr/>
                    <Link to="/userQuestions"><h4>View User Questions</h4></Link>
                    <Link to="/create"><h4>Create User Question</h4></Link>
            </nav>
        </div>
    );
}

export default Home;
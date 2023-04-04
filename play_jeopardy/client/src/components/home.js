import React from 'react';
import { Link } from 'react-router-dom';
import * as Spaces from 'react-spaces';

function Home(){
    return (
        <div>
            
            <nav>
                <Spaces.ViewPort>
                    <Spaces.Top size="15%"></Spaces.Top>
                    <Spaces.Left size = "2%"></Spaces.Left>
                    <Spaces.Fill>
                        <h2><b>Home</b></h2>
                    <Link to="/play"><h2><b>Play Jeopardy</b></h2></Link>
                    <Link to="/playnographics"><h5><b>Play No Graphics/Development version</b></h5></Link>
                    <hr/>
                    <Link to="/questions"><h3>View Questions</h3></Link> 
                    <Link to="/categories"><h3>View Categories</h3></Link>
                    <hr/>
                    <Link to="/userQuestions"><h4>View User Questions</h4></Link>
                    <Link to="/create"><h4>Create User Question</h4></Link>
                    </Spaces.Fill>
                    
                </Spaces.ViewPort>
            </nav>
        </div>
    );
}

export default Home;
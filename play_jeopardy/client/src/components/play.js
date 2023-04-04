import React from 'react';
import MainMenu from './mainMenu';
import Delayed from './delayed';


import BackgroundVideo from './backgroundVideo';
//import { Link } from 'react-router-dom';

function Play(){
    return (
    <div>
        <BackgroundVideo />
        
        <Delayed waitBeforeShow={5400}>
          <MainMenu />
        </Delayed>
    </div>
    );
}

export default Play;
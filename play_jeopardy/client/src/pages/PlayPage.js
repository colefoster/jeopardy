import React from 'react';
import MainMenu from 'components/MainMenu';
import Delayed from 'components/Delayed';


import BackgroundVideo from 'components/BackgroundVideo';
//import { Link } from 'react-router-dom';

function PlayPage(){
    return (
    <div>
        <BackgroundVideo />
        
        <Delayed waitBeforeShow={5400}>
          <MainMenu />
        </Delayed>
    </div>
    );
}

export default PlayPage;
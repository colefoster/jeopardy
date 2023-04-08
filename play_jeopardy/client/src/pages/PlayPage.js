import React from 'react';
import MainMenu from 'components/MainMenu';
import Delayed from 'components/Delayed';


import BackgroundVideo from 'components/BackgroundVideo';

function PlayPage(props){
  if(props.intro === "on"){
    return (
    <div>
        <BackgroundVideo />
        
        <Delayed waitBeforeShow={5600}>
          <MainMenu />
        </Delayed>
    </div>
    );
  } else {
    return (
      <div>
        <MainMenu />
      </div>
    );
  }
}

export default PlayPage;
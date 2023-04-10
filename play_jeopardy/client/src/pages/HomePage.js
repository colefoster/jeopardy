import React from 'react';
import MainMenu from '../components/MainMenu';
import Delayed from '../components/Delayed';
import Background from '../components/Background';

import BackgroundVideo from '../components/BackgroundVideo';

function HomePage(props){
  if(props.intro === "on"){
    return (
    <>
        <BackgroundVideo />
        
        <Delayed waitBeforeShow={5600}>
          <Background />
          <MainMenu />
        </Delayed>
    </>
    );
  } else {
    return (
      <>
        <Background />
        <MainMenu />
      </>
    );
  }
}

export default HomePage;
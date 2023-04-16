import React from 'react';
import MainMenu from '../components/MainMenu';
import Background from '../components/Background';

//import Delayed from '../components/Delayed';
//import BackgroundVideo from '../components/BackgroundVideo';
function HomePage(props){

  

  /* if(props.intro === "on"){
    return (
    <>
        <BackgroundVideo />
        <LoggedInStatusLabel />
        <OffCanvasMenu 
          toggleBackgroundButton={toggleBackground}
        />
        <Delayed waitBeforeShow={5600}>
          <Background />
          <MainMenu />
        </Delayed>
    </>
    );
  } else { */
    
    return (
      <>
      
        <Background  />
        
        <MainMenu />
      </>
    );
  }


export default HomePage;
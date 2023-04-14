import React from 'react';
import MainMenu from '../components/MainMenu';
import Delayed from '../components/Delayed';
import Background from '../components/Background';

import BackgroundVideo from '../components/BackgroundVideo';
import SignedInStatusLabel from 'components/SignedInStatusLabel';

function HomePage(props){
  if(props.intro === "on"){
    return (
    <>
        <BackgroundVideo />
        <SignedInStatusLabel />
        <Delayed waitBeforeShow={5600}>
          <Background />
          <MainMenu />
        </Delayed>
    </>
    );
  } else {
    return (
      <>
        <Background enabled={true}/>
        <MainMenu />
      </>
    );
  }
}

export default HomePage;
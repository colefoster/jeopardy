import React from 'react';
import JeopardyBoard from '../components/game/JeopardyBoard';
import Background from '../components/Background';
import * as Spaces from 'react-spaces'
import BorderSpacer from 'components/BorderSpacer';
import ScoreLabel from 'components/game/ScoreLabel';
import EndGameButton from 'components/game/EndGameButton';


function PlayPage(){

      return (
        <>
        
          <Background/>
          <EndGameButton/>
          <ScoreLabel/>
        
          <Spaces.ViewPort>
            <BorderSpacer />
          
            <JeopardyBoard />
              
          
          </Spaces.ViewPort>
        
        </>
    );
  
}

export default PlayPage;
import React from 'react';
import JeopardyBoard from '../components/game/JeopardyBoard';
import Background from '../components/Background';
import * as Spaces from 'react-spaces'
import BorderSpacer from 'components/BorderSpacer';


function PlayPage(){

      return (
        <>
        
          <Background/>
            
        
        <div>
            <Spaces.ViewPort>
            <BorderSpacer />
           
            <JeopardyBoard />
                
            
            </Spaces.ViewPort>
        </div>
        </>
    );
  
}

export default PlayPage;
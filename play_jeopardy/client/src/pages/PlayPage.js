import React from 'react';
import JeopardyBoard from '../components/game/JeopardyBoard';
import Background from '../components/Background';
import * as Spaces from 'react-spaces'
import BorderSpacer from 'components/BorderSpacer';


function PlayPage(props){
   
    return (
        <>
        <Background enabled={true}/>
            <Spaces.ViewPort>
            <BorderSpacer />
            
            <JeopardyBoard />
                
            
            </Spaces.ViewPort>
        </>
    );
  
}

export default PlayPage;
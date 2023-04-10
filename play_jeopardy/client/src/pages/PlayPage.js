import React from 'react';
import JeopardyBoard from '../components/game/JeopardyBoard';
import Background from '../components/Background';
import * as Spaces from 'react-spaces'
import BorderSpacer from 'components/BorderSpacer';


function PlayPage(props){
   
    return (
        <>
        <Background enabled={false}/>
            <Spaces.ViewPort>
            <BorderSpacer />
            <Spaces.Fill style={{
            backgroundColor: "green",
            opacity: 1,
            }}>
                <JeopardyBoard />
                
            </Spaces.Fill>
            
            </Spaces.ViewPort>
        </>
    );
  
}

export default PlayPage;
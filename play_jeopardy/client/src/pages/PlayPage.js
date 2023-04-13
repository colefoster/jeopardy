import React from 'react';
import JeopardyBoard from '../components/game/JeopardyBoard';
import Background from '../components/Background';
import * as Spaces from 'react-spaces'
import BorderSpacer from 'components/BorderSpacer';
import BackButton from 'components/BackButton';

function PlayPage(props){
   
    return (
        <>
        <BackButton />
        <Background enabled={true} mode={'picture'}/>
        <div>
            <Spaces.ViewPort>
            <BorderSpacer mode={'picture'}/>
           
            <JeopardyBoard />
                
            
            </Spaces.ViewPort>
        </div>
        </>
    );
  
}

export default PlayPage;
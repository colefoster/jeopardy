import React, {useState} from 'react';
import JeopardyBoard from '../components/game/JeopardyBoard';
import Background from '../components/Background';
import * as Spaces from 'react-spaces'
import BorderSpacer from 'components/BorderSpacer';


function PlayPage(){
    const [generateDistractors , setGenerateDistractors] = useState(false)

    function toggleDistractors(){
       setGenerateDistractors(!generateDistractors);
      }
      return (
        <>
        
          <Background generateDistractors={generateDistractors} toggleDistractorsFunction={toggleDistractors} />
            
        
        <div>
            <Spaces.ViewPort>
            <BorderSpacer mode={'picture'}/>
           
            <JeopardyBoard generateDistractors={generateDistractors}/>
                
            
            </Spaces.ViewPort>
        </div>
        </>
    );
  
}

export default PlayPage;
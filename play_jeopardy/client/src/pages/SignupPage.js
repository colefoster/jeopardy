import SignupForm from 'components/SignupForm';
import React from 'react';
import Background from 'components/Background';
import * as Spaces from 'react-spaces'
import Tilt from 'react-parallax-tilt';
import BackButton from 'components/BackButton';

function SignupPage(props){
   
    return (
        <>
        <Background enabled={true} mode={'picture'}/>
        <BackButton />
        <div>
            <Spaces.Fixed  height={600}>
                
                <Spaces.Centered>
                <Tilt trackOnWindow={true} tiltMaxAngleY={25} tiltMaxAngleX={25} scale={1.3}>
                    <h1 style={{
                        fontSize: '100px',
                    }}>Sign Up</h1>
                    </Tilt>
                    <br></br>
                    <SignupForm/>
                </Spaces.Centered>
            </Spaces.Fixed>
        </div>
        </>
    );
  
}

export default SignupPage;
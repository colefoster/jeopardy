import LoginForm from 'components/LoginForm';
import React from 'react';
import Background from 'components/Background';
import * as Spaces from 'react-spaces'
import Tilt from 'react-parallax-tilt';
import BackButton from 'components/BackButton';
import SignedInStatusLabel from 'components/SignedInStatusLabel';

function LoginPage(props){
   
    return (
        <>
        <Background enabled={true} mode={'picture'}/>
        <BackButton />
        <SignedInStatusLabel />
        <div>
            <Spaces.Fixed  height={400}>
                
                <Spaces.Centered>
                <Tilt trackOnWindow={true} tiltMaxAngleY={25} tiltMaxAngleX={25} scale={1.3}>
                    <h1 style={{
                        fontSize: '100px',
                    }}>Login</h1>
                    </Tilt>
                    <br></br>
                    <LoginForm/>
                </Spaces.Centered>
            </Spaces.Fixed>
        </div>
        </>
    );
  
}

export default LoginPage;
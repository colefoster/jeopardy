import LoginForm from 'components/LoginForm';
import React from 'react';
import Background from 'components/Background';
import * as Spaces from 'react-spaces'
import Tilt from 'react-parallax-tilt';
import BackButton from 'components/BackButton';
import LoggedInStatusLabel from 'components/LoggedInStatusLabel';

function LoginPage(props){
   
    return (
        <>
        <Background enabled={true} mode={'picture'}/>
        <BackButton />
        <LoggedInStatusLabel />
        <div>
            <Spaces.Fixed  height={500}>
                
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
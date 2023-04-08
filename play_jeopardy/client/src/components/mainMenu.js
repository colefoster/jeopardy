import React from 'react'
import MenuSlider from 'components/MenuSlider'
import * as Spaces from 'react-spaces'
import Tilt from 'react-parallax-tilt';
import Background from './Background';


export default function mainMenu() {
    
  return (
    <> 
    <Background />
        <Spaces.ViewPort>
            <Spaces.Top size="70%">
                <Spaces.Centered>
                    <Tilt tiltReverse={true}>
                        <title>Jeopardy!</title>
                    </Tilt>
                </Spaces.Centered>
            </Spaces.Top>
            <Spaces.Fill >
                <MenuSlider />
            </Spaces.Fill>
        </Spaces.ViewPort>
     </>
  )
}

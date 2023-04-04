import React from 'react'
import MenuSlider from './menuSlider'
import * as Spaces from 'react-spaces'
import Tilt from 'react-parallax-tilt';


export default function mainMenu() {//TODO continue adding buttons, choose new library for buttons
  return (
    
        <Spaces.ViewPort>
            <Spaces.Top size="70%">
                <Spaces.Centered>
                    <Tilt tiltReverse={true}>
                    <h1>Jeopardy!</h1>
                    </Tilt>
                    </Spaces.Centered>
                
            </Spaces.Top>
        <Spaces.Fill >
            
            <MenuSlider />
         
        </Spaces.Fill>
        </Spaces.ViewPort>
    
  )
}

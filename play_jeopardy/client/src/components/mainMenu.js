import React from 'react'
import MenuSlider from 'components/MenuSlider'
import * as Spaces from 'react-spaces'
import Tilt from 'react-parallax-tilt';
import '../styles/TitleStyles.css'

export default function mainMenu() {
    
  return (
    <> 
        <Spaces.ViewPort>
            <Spaces.Top size="60%">
                <Spaces.Centered>
                    <Tilt trackOnWindow={true} tiltMaxAngleY={15} tiltMaxAngleX={15} scale={1.1}tiltReverse={true}>
                        <h1>Jeopardy!</h1>
                    </Tilt> 
                </Spaces.Centered>
            </Spaces.Top>
            <Spaces.Bottom size="1%">
                </Spaces.Bottom>
            <Spaces.Fill >
                <MenuSlider />
            </Spaces.Fill>
        </Spaces.ViewPort>
     </>
  )
}

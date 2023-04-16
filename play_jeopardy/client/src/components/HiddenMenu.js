
import React, { useState } from "react";
import { OffCanvas, OffCanvasMenu } from "react-offcanvas";
import Hamburger from 'hamburger-react'
import LoggedInStatusLabel from './LoggedInStatusLabel';
import Toggle from 'react-toggle'
import "react-toggle/style.css" // for ES6 modules

import { useSelector, useDispatch } from 'react-redux';
import { toggleDistractors, toggleBackgroundMode } from '../redux/settingsSlice';

function HiddenMenu(){
    const [isOpen, setOpen] = useState(false)

    const dispatch = useDispatch();
  
    function handleDistractorsToggle() {
      dispatch(toggleDistractors());
    }
  
    function handleBackgroundModeChange() {
      dispatch(toggleBackgroundMode());
    }

    return (
        <><div style={{
          color: 'white',
          border: 'none',
          fontSize: 'calc(1vw + 1vh)',
          position: 'absolute',
          left: '2vw',
          top: '2vh',
          zIndex: '20',
        }}>
        <Hamburger toggled={isOpen} toggle={setOpen} size={48}/>
    

      <OffCanvas
        width={300}
        transitionDuration={300}
        effect={"parallax"}
        isMenuOpened={isOpen}
        position={"right"}
        style={{
          background: "black",

        }}
      >
        
        <OffCanvasMenu  style={{
          border: '1px solid white',
          margin: '0px',
        }}>
          <div style={{
            alignContent: 'center',
            textAlign: 'center',
          }}>
            
            Menu

            <br/><br/>

            <button onClick={handleBackgroundModeChange}>
              Toggle Background
            </button>
        
            <br/><br/>
          
            <LoggedInStatusLabel />
          
            <br/><br/>
            
            <Toggle
              defaultChecked={useSelector(state => state.settings.generateDistractors)}
              onChange={handleDistractorsToggle}/>
              <span> Enable OPENAI Distractor Generation</span>

              </div>
        </OffCanvasMenu>
      </OffCanvas>
      </div>
      </>
    );
  }

export default HiddenMenu;

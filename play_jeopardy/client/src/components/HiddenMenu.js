import SelectSearch from 'react-select-search';
import 'react-select-search/style.css';

import React, { useState } from "react";
import { OffCanvas, OffCanvasMenu } from "react-offcanvas";
import Hamburger from 'hamburger-react'
import LoggedInStatusLabel from './LoggedInStatusLabel';
import Toggle from 'react-toggle'
import "react-toggle/style.css" // for ES6 modules

import { useSelector, useDispatch } from 'react-redux';
import { toggleDistractors, toggleBackgroundMode, setModel, setApiPrefix } from '../redux/settingsSlice';
import AutosizeInput from 'react-input-autosize';

function HiddenMenu(){
    const [isOpen, setOpen] = useState(false)
    const dispatch = useDispatch();
  
    function handleDistractorsToggle() {
      dispatch(toggleDistractors());
    }
  
    function handleBackgroundModeChange() {
      dispatch(toggleBackgroundMode());
    }

    function updateModel(value) {
      dispatch(setModel(value));
    }
    const modelOptions = [
      { name: '3.5 Turbo', value: 'gpt-3.5-turbo' },
      { name: 'Davinci 3', value: 'text-davinci-003' }
    ];
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

            <button style={{
          backgroundColor: '#0D1557',
          borderColor: 'black',
          borderRadius: '10px',
          color: 'white',
          padding: '5px 32px',
          textAlign: 'center',
          display: 'inline-block',
          fontSize: '25px',
          fontFamily: 'Swis721 BlkCn BT',
        }} onClick={handleBackgroundModeChange}>
              Toggle Background
            </button>
        
            <br/><br/>
          
            <LoggedInStatusLabel />
          
            <br/><br/>
            
            <Toggle
              defaultChecked={useSelector(state => state.settings.generateDistractors)}
              onChange={handleDistractorsToggle}/>
              <span> Multiple Choice</span>


            <div  style={{
              display: useSelector(state => state.settings.generateDistractors) ? 'block' : 'none',}}>
                <small>openai model:</small>
              <SelectSearch options={modelOptions} onChange={updateModel} value="gpt-3.5-turbo"/>
            
            <small>api key prefix:<div style={{
              fontSize: '0.5em',
            }}>to stop people spamming api requests using my key, ask cole for password</div></small>
            <AutosizeInput style={{
                display: useSelector(state => state.settings.generateDistractors) ? 'block' : 'none',
                background: 'transparent', borderRadius: 5, padding: 5,fontStyle: 'bold'
            }} placeholder="key" onChange={function (event){dispatch(setApiPrefix(event.target.value))}} inputStyle={{ border: '1px solid #999', borderRadius: 3, padding: 3, fontSize: 25, fontWeight: 'bold', color:'black',alignContent: 'center', flex:'center', justifyContent: 'center' }}/>
            </div></div>
        </OffCanvasMenu>
      </OffCanvas>
      </div>
      </>
    );
  }

export default HiddenMenu;

import React from 'react';
import '../../styles/JeopardyBoard.css'
import Tilt from 'react-parallax-tilt'
const Question = (props) => {
  
  return (
    <>
    <Tilt scale={1.2}>
    {'$' + 200 * (props.index + 1)  }
    </Tilt>
    </>
  );
};

export default Question;

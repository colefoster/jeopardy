import React from 'react';
import '../../styles/JeopardyBoard.css'

const Question = (props) => {
  
  return (
    <>
    {'$' + 200 * (props.index + 1)  }
    </>
  );
};

export default Question;

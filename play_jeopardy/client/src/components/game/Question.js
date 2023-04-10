import React from 'react';
import '../../styles/JeopardyBoard.css'

const Question = (props) => {
  const handleAnswerClick = () => {
    
  };
  return (
    <div className="box" onClick={handleAnswerClick}>
      <div className="question-value">{props.value}</div>
      <div className="question-clue">{props.question}</div>
        <div className="question-answer">{props.answer}</div>
    </div>
  );
};

export default Question;

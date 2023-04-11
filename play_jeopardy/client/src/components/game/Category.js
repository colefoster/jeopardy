import React from 'react';
import { connect } from 'react-redux';
import * as Spaces from 'react-spaces'
import '../../styles/JeopardyBoard.css'
import { answerQuestion, revealQuestion, updateScore } from '../../redux/gameSlice';
import Question from './Question';

const Category = (props) => {
    const title = typeof props.title === 'function' ? props.title() : props.title;
    const questions = Array.isArray(props.questions) ? props.questions : Object.values(props.questions);
    
  return (
    <>
    <Spaces.Top size="16.7%" className='categoryNameBox' key={title + "-header"}>
        {title}
    </Spaces.Top>
    {questions.map((question, index) =>
        <Spaces.Top size="16.7%" key={index + "_space"} className="questionBox">
        <Question
            value={question.value}
            question={question.clue}
            answer={question.response}
            revealed={question.revealed}
            key={question.value + "-question"}
            index={index}
        />
        </Spaces.Top>
    )}    
    </>
  );
};

const mapStateToProps = (state) => ({
  questionsAnswered: state.game.questionsAnswered,
});

export default connect(mapStateToProps, { answerQuestion, revealQuestion, updateScore })(Category);

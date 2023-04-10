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
    <Spaces.Top size="16.66667%" key={title + "-header"} style={{
        backgroundColor: "#" + Math.floor(Math.random()*16777215).toString(16)
    }}>
    <div className="category-title" key={title+ "title"}>{title}</div>
    </Spaces.Top>
    {questions.map((question, index) =>
        <Spaces.Top size="16.66667%" key={index + "_space"} style={{
            backgroundColor: "#" + Math.floor(Math.random()*16777215).toString(16)
        }}>
        <Question
            value={question.value}
            question={question.question}
            answer={question.answer}
            revealed={question.revealed}
            key={question.value + "-question"}
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

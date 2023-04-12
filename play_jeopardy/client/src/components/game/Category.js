import React, { useState } from 'react';
import { connect} from 'react-redux';
import * as Spaces from 'react-spaces'
import Tilt from 'react-parallax-tilt'
import '../../styles/JeopardyBoard.css'
import { answerQuestion, revealQuestion, updateScore } from '../../redux/gameSlice';
import Question from './Question';
//import { Zoom } from 'react-reveal';

const Category = (props) => {
    const [answeredQuestions, setAnsweredQuestions] = useState([]);
    const title = typeof props.title === 'function' ? props.title() : props.title;
    const questions = Array.isArray(props.questions) ? props.questions : Object.values(props.questions);

    const handleReveal = (questionRow) => {
        setAnsweredQuestions([...answeredQuestions, questionRow]);
    }

    return (
        <>
            <Spaces.Top size="16.7%" className='categoryNameBox' key={title + "-header"}>
                <Tilt scale={1.1}>
                    {title}
                </Tilt>
            </Spaces.Top>
            {questions.map((question, index) =>
                <Spaces.Top size="16.7%" key={index + "_space"} className="questionBox" onClick={() => handleReveal(index)} >
                    <Question
                        value={question.value}
                        category={title}
                        question={question.clue}
                        answer={question.response}
                        revealed={question.revealed}
                        key={question.value + "-question"}
                        id={question._id}
                        index={index}
                        flipped={answeredQuestions.includes(index)}
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

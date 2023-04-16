import React from 'react';
import * as Spaces from 'react-spaces'
import Tilt from 'react-parallax-tilt'
import '../../styles/JeopardyBoard.css'
import Question from './Question';
//import { Zoom } from 'react-reveal';

const Category = (props) => {

    const title = typeof props.title === 'function' ? props.title() : props.title;
    const questions = Array.isArray(props.questions) ? props.questions : Object.values(props.questions);

    return (
        <>
            <Spaces.Top size="16.8%" className='categoryNameBox' key={title + "-header"}>
                <Tilt scale={1.1}>
                    {title}
                </Tilt>
            </Spaces.Top>
            {questions.map((question, index) =>
                
                    <Question
                        value={question.value}
                        category={title}
                        question={question.clue}
                        answer={question.response}
                        revealed={question.revealed}
                        key={question._id + "-question" + index}
                        id={question._id}
                        index={index}
                    />
               
            )}    
        </>
    );
};
export default Category;
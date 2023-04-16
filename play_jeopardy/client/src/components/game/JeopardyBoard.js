import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
//import Tilt from 'react-parallax-tilt'
import * as Spaces from 'react-spaces';
import { startNewGame } from '../../redux/gameSlice';
import Category from './Category';
const JeopardyBoard = (props) => {
    const categories = useSelector(state => state.game.categories);
    const questions = useSelector(state => state.game.questions);
    const dispatch = useDispatch();

    const startNewGameCallback = useCallback(() => {
        dispatch(startNewGame());
    }, [dispatch]);

    useEffect(() => {
        startNewGameCallback();
        
    }, [startNewGameCallback]);
    

    //const generateDistractors = props.generateDistractors;

    return (
        <>
         
        <Spaces.Fill className='jeopardyBoard'>
            {categories.map((category, index) =>
                <Spaces.Left size="16.668%" className='categoryColumn' key={index + "_space"}>
                    
                <Category title={category.title} index={index} questions={questions[index]} key={category.title + "-column"}  />
                
                </Spaces.Left>
            )}
        </Spaces.Fill>
        </>
    );
};

const mapStateToProps = (state) => ({
  categories: state.game.categories,
  questions: state.game.questions,
  
});

export default connect(mapStateToProps, { startNewGame })(JeopardyBoard);

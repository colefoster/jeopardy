import React, { useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import * as Spaces from 'react-spaces'

import { startNewGame } from '../../redux/gameSlice';
import Category from './Category';
const JeopardyBoard = () => {
    const categories = useSelector(state => state.game.categories);
    const questions = useSelector(state => state.game.questions);
    const dispatch = useDispatch();

    const startNewGameCallback = useCallback(() => {
        dispatch(startNewGame());
    }, [dispatch]);

    useEffect(() => {
        startNewGameCallback();
    }, [startNewGameCallback]);
    return (
        <>
            {categories.map((category, index) =>
                <Spaces.Left size="16.66667%" key={index + "_space"} style={{
                    backgroundColor: "#" + Math.floor(Math.random()*16777215).toString(16)
                }}>
                <Category title={category.title} questions={questions[index]} key={category.title + "-column"} />
                </Spaces.Left>
            )}
        
        </>
    );
};

const mapStateToProps = (state) => ({
  categories: state.game.categories,
  questions: state.game.questions,
  
});

export default connect(mapStateToProps, { startNewGame })(JeopardyBoard);

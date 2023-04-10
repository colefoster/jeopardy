import React from 'react';
import JeopardyBoard from '../components/JeopardyBoard';
import Background from '../components/Background';
import { useDispatch } from 'react-redux';
import { startNewGame} from 'redux/gameSlice';

function PlayPage(props){
    //const game = useSelector((state) => state.game);
    const dispatch = useDispatch()

    dispatch(startNewGame());
    return (
        <>
            <Background />
            <JeopardyBoard />
        </>
    );
  
}

export default PlayPage;
import React from 'react'
import { useSelector } from 'react-redux'

import '../../styles/JeopardyBoard.css'
function ScoreLabel() {
    const score = useSelector(state => state.game.score)
  return (
    <div style={{
        position: 'absolute',
        left: '50%',
        top: '0px',
        transform: 'translate(-50%, -10%)',
        fontFamily: 'Dollar-Amount',
        fontWeight: '100',
        color: '#f9c145',
        fontSize: 'calc(3.5vh + 3.5vw)',
        textShadow:'4px 2px #000000',
        zIndex: '0',
        paddingBottom: '5%'
    }}>
        Score: {score}
    </div>
  )
}

export default ScoreLabel
import React from 'react'
import { useSelector } from 'react-redux'

import '../../styles/JeopardyBoard.css'
function ScoreLabel() {
    const score = useSelector(state => state.game.score)
  return (
    <div style={{
        position: 'absolute',
        top: '10vh',
        left: '.5vw',
        fontFamily: 'Dollar-Amount',
        fontWeight: 'bold',
        color: '#f9c145',
        fontSize: 'calc(2.5vh + 2.5vw)',
        textShadow:'4px 2px #000000',
        zIndex: '1',
    }}>
        Score: {score}
    </div>
  )
}

export default ScoreLabel
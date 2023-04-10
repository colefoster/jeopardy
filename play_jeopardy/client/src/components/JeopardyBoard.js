import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// eslint-disable-next-line
import { updateScore, revealQuestion, answerQuestion, getGameInfo } from '../redux/gameSlice'

import * as Spaces from 'react-spaces'
import '../styles/JeopardyBoard.css'
const JeopardyBoard = () => {

  const dispatch = useDispatch();
  const game = useSelector((state) => state.game);
  const categories = game.categories;
  const questions = game.questions;




   return (
    <>
    <Spaces.ViewPort>
      <Spaces.Top size="15%" style={{
          backgroundColor: "gray",
          opacity: 0.5,
        }}></Spaces.Top>
      
        <Spaces.Left size="15%"
        style={{
          backgroundColor: "gray",
          opacity: 0.5,
        }}></Spaces.Left>

        <Spaces.Right size="15%"
        style={{
          backgroundColor: "gray",
          opacity: 0.5,
        }}></Spaces.Right>

        <Spaces.Bottom size="15%"
        style={{
          backgroundColor: "gray",
          opacity: 0.5,
        }}></Spaces.Bottom>

        <Spaces.Fill style={{
          backgroundColor: "blue",
        }}>

          {categories.map((category, index) => (
            <Spaces.Left size="16.7%" style={{
              backgroundColor: "#" + Math.floor(Math.random()*16777215).toString(16)
            }}>
            <div className="category">
              <h2>{category.title}</h2>
            </div>
            </Spaces.Left>
          ))}
              



        </Spaces.Fill>
        
      
      

        



      
      
      
    </Spaces.ViewPort>
    </>
  );
}
export default JeopardyBoard;
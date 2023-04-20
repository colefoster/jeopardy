import { createSlice } from '@reduxjs/toolkit';

import SERVER from 'server_address';

// Define a separate function to fetch a new game from the server
async function fetchNewGame() {
  const response = await fetch(SERVER.URL + `/api/game`);
  if (!response.ok) {
    const message = `An error occured: ${response.statusText}`;
    window.alert(message); 
    return null;
  }

  const game = await response.json();
  return game;
}

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    id:Number,
    categories: [{
      id: Number,
      title: String,
      clues_count: Number,
      clues: [String],
    }],
    questions: [{
      id: Number,
      question: String,
      answer: String,
      category: String,
      isDailyDouble: Boolean,
      round: String,
      value: Number,
      flipped: false,
      distractors: [String],
    }],
    players: [{ name: 'default'}],
    score: 0,
    questionsAnswered: [String],
  },
  reducers: {
    setGameInfo: (state, action) => {
      const { categories, questions, players, questionsAnswered, flipped, id } = action.payload;
      return { ...state, categories, questions, players, questionsAnswered , flipped, id};
    },
    
    adjustScore: (state, action) =>{
      const amount = action.payload;
      state.score += amount; 
    },
   
    addQuestionAnswered: (state, action) => {
      
      if (Array.isArray(state.questionsAnswered)) {
        state.questionsAnswered = [...state.questionsAnswered, action.payload];
      } else {
        state.questionsAnswered = [action.payload];
      }
    },
    
  },
});

export const { setGameInfo, addQuestionAnswered,   adjustScore } = gameSlice.actions;

// Define a separate thunk function to fetch a new game and dispatch the setGameInfo action
export const startNewGame = () => async (dispatch) => {
  const game = await fetchNewGame();
  console.log(game);
  if (game) {
    dispatch(setGameInfo(game));
    
  }
};

export default gameSlice.reducer;

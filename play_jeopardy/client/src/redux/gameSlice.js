import { createSlice } from '@reduxjs/toolkit';
//import SERVER from 'server_address';
export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    categories: [],
    questions: [{
      category: '',
      question: '',
      answer: '',
      value: 0,
      answered: false,
      revealed: false,

    }],
    players: [{
      name: '',
      score: 0,
    }],
    questionsAnswered: 0

  },
  reducers: {
    startNewGame: (state, action) => {
      
      state.categories = action.payload.categories;
      state.questions = action.payload.questions;
      state.players = action.payload.players;
      state.questionsAnswered = 0;
    },
    getGameInfo: (state, action) => {
      return action.payload;
    },
    answerQuestion: (state, action) => {
      const { categoryIndex, questionIndex } = action.payload;
      state[categoryIndex].questions[questionIndex].answered = true;
    },
    revealQuestion: (state, action) => {
      const { categoryIndex, questionIndex } = action.payload;
      state[categoryIndex].questions[questionIndex].revealed = true;
    },
    updateScore: (state, action) => {
      const { categoryIndex, questionIndex, score } = action.payload;
      state[categoryIndex].questions[questionIndex].score = score;
    },


  },
});

export const { getGameInfo, startNewGame, answerQuestion, revealQuestion, updateScore} = gameSlice.actions;

export default gameSlice.reducer;

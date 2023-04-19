// settingsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {  //DEFAULT SETTINGS FOR THE APP
  generateDistractors: true,
  backgroundMode: 'particles',
  model: 'gpt-3.5-turbo',
  apiPrefix:'sk-',
  user: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDistractors(state) {
      state.generateDistractors = !state.generateDistractors;
    },
    toggleBackgroundMode(state) {
      state.backgroundMode = (state.backgroundMode === 'particles' ? 'picture' : 'particles');
    },
    setModel(state, action) {
      state.model = action.payload;
    },
    setApiPrefix(state, action) {
      state.apiPrefix = action.payload;
  },
  setUser(state, action) {
    state.user = action.payload;
  },
}
});

export const { setUser, toggleDistractors, toggleBackgroundMode, setModel, setApiPrefix } = settingsSlice.actions;

export default settingsSlice.reducer;

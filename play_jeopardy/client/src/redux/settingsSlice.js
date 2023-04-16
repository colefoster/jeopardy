// settingsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  generateDistractors: false,
  backgroundMode: 'particles'
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
    }
  }
});

export const { toggleDistractors, toggleBackgroundMode } = settingsSlice.actions;

export default settingsSlice.reducer;

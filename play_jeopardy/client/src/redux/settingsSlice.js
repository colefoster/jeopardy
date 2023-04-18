// settingsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  generateDistractors: false,
  backgroundMode: 'particles',
  model: 'gpt-3.5-turbo',
  apiPrefix:''
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
  }
}
});

export const { toggleDistractors, toggleBackgroundMode, setModel, setApiPrefix } = settingsSlice.actions;

export default settingsSlice.reducer;

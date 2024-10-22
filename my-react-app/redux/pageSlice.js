import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    nextPage: (state) => {
      state.value += 1;
    },
    prevPage: (state) => {
      if (state.value > 0) {
        state.value -= 1;
      }
    },
  },
});

export const { nextPage, prevPage } = pageSlice.actions;

export default pageSlice.reducer;

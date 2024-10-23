import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 0,
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    nextPage: (state) => {
      state.currentPage += 1;
    },
    prevPage: (state) => {
      if (state.currentPage > 0) {
        state.currentPage -= 1;
      }
    },
  },
});

export const { nextPage, prevPage } = pageSlice.actions;

export default pageSlice.reducer;

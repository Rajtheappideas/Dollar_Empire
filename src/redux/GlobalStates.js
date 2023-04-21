import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showProductDetailsPopup: false,
};

const GlobalStates = createSlice({
  name: "globalstates",
  initialState,
  reducers: {
    showPopup: (state) => {
      state.showProductDetailsPopup = true;
    },
    closePopup: (state) => {
      state.showProductDetailsPopup = false;
    },
  },
});

export const { closePopup, showPopup } = GlobalStates.actions;

export default GlobalStates.reducer;

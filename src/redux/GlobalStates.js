import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showProductDetailsPopup: false,
  activeComponentForCart: "Shopping_Cart",
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
    handleChangeActiveComponent: (state, { payload }) => {
      state.activeComponentForCart = payload;
    },
  },
});

export const { closePopup, showPopup, handleChangeActiveComponent } =
  GlobalStates.actions;

export default GlobalStates.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { BroadcastChannel } from "broadcast-channel";

const initialState = {
  showProductDetailsPopup: false,
  activeComponentForCart: "Shopping_Cart",
};
const logoutChannel = new BroadcastChannel("handleLogout");
const loginChannel = new BroadcastChannel("handleSuccess");

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
    handleSuccess: () => {
      loginChannel.postMessage("");
      loginChannel.onmessage = (event) => {
        loginChannel.close();
      };
    },
    handleLogout: () => {
      logoutChannel.postMessage("");
      logoutChannel.onmessage = (event) => {
        logoutChannel.close();
      };
    },

    logoutAllTabsEventListener: () => {
      logoutChannel.onmessage = (event) => {
        logoutChannel.close();
        window.location.reload();
      };
    },
    loginAllTabsEventListener: () => {
      loginChannel.onmessage = (event) => {
        window.location.reload();
        loginChannel.close();
      };
    },
  },
});

export const {
  closePopup,
  showPopup,
  handleChangeActiveComponent,
  loginAllTabsEventListener,
  logoutAllTabsEventListener,
  handleSuccess,
  handleLogout,
} = GlobalStates.actions;

export default GlobalStates.reducer;

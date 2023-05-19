import { createSlice } from "@reduxjs/toolkit";
import { BroadcastChannel } from "broadcast-channel";

const initialState = {
  showProductDetailsPopup: false,
  activeComponentForCart: "Shopping_Cart",
  singleProductId: null,
  perPageItemView: window.localStorage.getItem("persist:globalStates")
    ? JSON.parse(window.localStorage.getItem("persist:globalStates"))
        .perPageItemView
    : "128",
  productListingPageLink: "",
  pagination: 0,
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
      state.singleProductId = null;
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
    handleSetSingelProductId: (state, { payload }) => {
      state.singleProductId = payload;
    },
    handleChangePagePerView: (state, { payload }) => {
      state.perPageItemView = payload;
    },
    handleChangeProductListingPageLink: (state, { payload }) => {
      state.productListingPageLink = payload?.link;
      state.pagination = payload?.pagination;
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
  handleChangeProductListingPageLink,
  handleSetSingelProductId,
  handleChangePagePerView,
} = GlobalStates.actions;

export default GlobalStates.reducer;

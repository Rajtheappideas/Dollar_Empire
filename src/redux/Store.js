import { configureStore } from "@reduxjs/toolkit";
import GlobalStates from "./GlobalStates";
import AuthSlice from "./AuthSlice";

const store = configureStore({
  reducer: {
    globalStates: GlobalStates,
    Auth: AuthSlice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(loggerMiddleware),
  // preloadedState,
  // enhancers: [monitorReducersEnhancer],
});
export default store;

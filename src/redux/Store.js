import { configureStore } from "@reduxjs/toolkit";
import GlobalStates from "./GlobalStates";

const store = configureStore({
  reducer: {
    globalStates: GlobalStates,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(loggerMiddleware),
  // preloadedState,
  // enhancers: [monitorReducersEnhancer],
});
export default store;

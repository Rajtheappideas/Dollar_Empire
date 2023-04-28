import { configureStore } from "@reduxjs/toolkit";
import GlobalStates from "./GlobalStates";
import AuthSlice from "./AuthSlice";
import BasicFeatureSlice from "./BasicFeatureSlice";
import GetContentSlice from "./GetContentSlice";
import FeatureSlice from "./FeatureSlice";

const store = configureStore({
  reducer: {
    globalStates: GlobalStates,
    Auth: AuthSlice,
    basicFeatures: BasicFeatureSlice,
    getContent: GetContentSlice,
    features: FeatureSlice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(loggerMiddleware),
  // preloadedState,
  // enhancers: [monitorReducersEnhancer],
});
export default store;

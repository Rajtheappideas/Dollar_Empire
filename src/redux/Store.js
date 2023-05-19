import { configureStore } from "@reduxjs/toolkit";
import GlobalStates from "./GlobalStates";
import AuthSlice from "./AuthSlice";
import BasicFeatureSlice from "./BasicFeatureSlice";
import GetContentSlice from "./GetContentSlice";
import FeatureSlice from "./FeatureSlice";
import CartSlice from "./CartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import OrderSlice from "./OrderSlice";

const persistConfigForGlobalStates = {
  key: "globalStates",
  storage,
};
const persistConfigForCart = {
  key: "cart",
  storage,
};

const persisteGlobalStates = persistReducer(
  persistConfigForGlobalStates,
  GlobalStates
);
const persisteCart = persistReducer(persistConfigForCart, CartSlice);

export const store = configureStore({
  reducer: {
    globalStates: persisteGlobalStates,
    Auth: AuthSlice,
    basicFeatures: BasicFeatureSlice,
    getContent: GetContentSlice,
    features: FeatureSlice,
    orders: OrderSlice,
    cart: persisteCart,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

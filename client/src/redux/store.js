import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./loaderSlice";
import userSlice from "./userSlice";
import productSlice from "./productSlice";
import cartSlice from "./cartSlice";

const rootReducer = combineReducers({
  loader: loaderSlice,
  user: userSlice,
  product: productSlice,
  cart: cartSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

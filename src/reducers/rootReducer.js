// src/reducers/rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authReducer from "./authSlice";
import productReducer from "./productSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  products: productReducer,
});

export default rootReducer;

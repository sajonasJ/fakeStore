"use strict";
import { createSlice } from "@reduxjs/toolkit";
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    cart:[],
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      state.value += 1;
    },
  },
});

export const { increment, decrement, addToCart } = counterSlice.actions;
export const selectCount = (state) => state.counter.value;
export const selectCart = (state) => state.counter.cart;
export default counterSlice.reducer;

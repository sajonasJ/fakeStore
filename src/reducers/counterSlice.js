"use strict";
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    cart: [],
  },
  reducers: {
    increment: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.cart[itemIndex] = { ...state.cart[itemIndex], count: state.cart[itemIndex].count + 1 };
      } else {
        state.cart.push({ ...action.payload, count: 1 });
      }
      state.value += 1;
    },
    decrement: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1 && state.cart[itemIndex].count > 0) {
        state.cart[itemIndex] = { ...state.cart[itemIndex], count: state.cart[itemIndex].count - 1 };
        state.value -= 1;
      }
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export const selectCount = (state) => state.counter.value;
export const selectCart = (state) => state.counter.cart;
export default counterSlice.reducer;

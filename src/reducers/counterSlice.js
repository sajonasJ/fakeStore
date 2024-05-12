"use strict";
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    cart: [],
  },
  reducers: {
    // Reducer function to increment the counter and add item to cart
    increment: (state, action) => {
      // Find index of the item in the cart
      const itemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        // If item exists in cart, increment its count
        state.cart[itemIndex] = { ...state.cart[itemIndex], count: state.cart[itemIndex].count + 1 };
      } else {
        // If item does not exist in cart, add it with count 1
        state.cart.push({ ...action.payload, count: 1 });
      }
      // Increment the total counter value
      state.value += 1;
    },
    // Reducer function to decrement the counter and remove item from cart
    decrement: (state, action) => {
      // Find index of the item
      const itemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1 && state.cart[itemIndex].count > 0) {
        // If item exists in cart and its count is greater than 0, decrement its count
        state.cart[itemIndex] = { ...state.cart[itemIndex], count: state.cart[itemIndex].count - 1 };
        // Decrement the total counter value
        state.value -= 1;
      }
    },
  },
});

export const { increment, decrement } = counterSlice.actions;
export const selectCount = (state) => state.counter.value;
export const selectCart = (state) => state.counter.cart;
export default counterSlice.reducer;

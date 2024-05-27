import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addCart, getCart } from "../service/authService";

// Create an async thunk for updating the cart
export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (cartData, { rejectWithValue }) => {
    try {
      const response = await addCart(cartData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (token, { rejectWithValue }) => {
    try {
      const response = await getCart(token);
      if (response.status !== 'OK') {
        throw new Error(response.message);
      }
      return response.items;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {
    increment: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.cart[itemIndex] = {
          ...state.cart[itemIndex],
          count: state.cart[itemIndex].count + 1,
        };
      } else {
        state.cart.push({ ...action.payload, count: 1 });
      }
      state.value += 1;
    },
    decrement: (state, action) => {
      const itemIndex = state.cart.findIndex((item) => item.id === action.payload.id);
      if (itemIndex !== -1 && state.cart[itemIndex].count > 0) {
        state.cart[itemIndex] = {
          ...state.cart[itemIndex],
          count: state.cart[itemIndex].count - 1,
        };
        state.value -= 1;
      }
    },
    resetCart: (state) => {
      state.cart = [];
      state.value = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.value = action.payload.reduce((total, item) => total + item.count, 0);
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Cart updated successfully:", action.payload);
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Error updating cart:", action.payload);
      });
  },
});

export const { increment, decrement, resetCart } = counterSlice.actions;
export const selectCount = (state) => state.counter.value;
export const selectCart = (state) => state.counter.cart;
export default counterSlice.reducer;

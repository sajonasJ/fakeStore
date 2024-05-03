"use strict";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {fetchProducts} from "../service/fakeStoreAPI";

const initialState = {
  productData: null,
  loading: false,
  error: null,
  selectedCategory: null,
};

// Create an asynchronous thunk action
export const loadProductData = createAsyncThunk(
  "loadProduct",
  async (selectedCategory, thunkAPI) => {
    if (!selectedCategory)
      return thunkAPI.rejectWithValue("selectedCategory can't be empty.");
    try {
      const ret = await fetchProducts();
      if (selectedCategory !== "all") {
        return ret.filter((product) => product.category === selectedCategory);
      }
      return ret;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const productSlice  = createSlice({
  name: "products",
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProductData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.productData = action.payload;
      })
      .addCase(loadProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.productData = [];
      });
  },
});
export const { selectCategory } = productSlice.actions;
export const selectProduct = (state) => state.product;
export default productSlice.reducer;

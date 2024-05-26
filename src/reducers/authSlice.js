// slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signUpUser } from "../service/authService";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const userSignUp = createAsyncThunk(
  "auth/userSignUp",
  async (userData, thunkAPI) => {
    try {
      const response = await signUpUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectAuth = (state) => state.auth;
export default authSlice.reducer;

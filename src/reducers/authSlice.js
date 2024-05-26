import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signUpUser, signInUser } from "../service/authService";

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const userSignUp = createAsyncThunk("auth/userSignUp", async (userData, thunkAPI) => {
  try {
    const response = await signUpUser(userData);
    if (response.status === "error") {
      return thunkAPI.rejectWithValue(response.message);
    }
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const userSignIn = createAsyncThunk("auth/userSignIn", async (userData, thunkAPI) => {
  try {
    const response = await signInUser(userData);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userSignIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(userSignIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { signOut, updateProfile } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateOrderStatus,
  createOrder,
  signUpUser,
  signInUser,
  updateUser,
  getAllOrders,
} from "../service/authService";

const initialState = {
  user: null,
  orders: [],
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const userSignUp = createAsyncThunk(
  "auth/userSignUp",
  async (userData, thunkAPI) => {
    try {
      const response = await signUpUser(userData);
      if (response.status === "error") {
        return thunkAPI.rejectWithValue(response.message);
      }
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userSignIn = createAsyncThunk(
  "auth/userSignIn",
  async (userData, thunkAPI) => {
    try {
      const response = await signInUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (userData, thunkAPI) => {
    try {
      const response = await updateUser(userData);
      if (response.status === "error") {
        return thunkAPI.rejectWithValue(response.message);
      }
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createNewOrder = createAsyncThunk(
  "orders/createNewOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await createOrder(orderData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (token, { rejectWithValue }) => {
    try {
      const orders = await getAllOrders(token);
      return orders;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async (orderData, { getState, rejectWithValue }) => {
    const { auth } = getState();
    const { user } = auth;
    if (!user || !user.token) {
      return rejectWithValue("User not authenticated");
    }

    try {
      const response = await updateOrderStatus({
        ...orderData,
        token: user.token,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    updateProfileState: (state, action) => {
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
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.loading = false;
        // Handle successful order creation if needed
      })
      .addCase(createNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        // Handle successful order update if needed
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { signOut, updateProfileState } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export const selectOrders = (state) => state.auth.orders;
export default authSlice.reducer;

"use strict";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducers/counterSlice";
import productReducer from "../reducers/productSlice";

export default configureStore ({
    reducer:{
        counter: counterReducer,
        product: productReducer,
    },
});
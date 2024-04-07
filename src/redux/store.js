import { configureStore } from "@reduxjs/toolkit";

import { userReducers } from "./userReducers";

import { modalReducers } from "./modalReducers";

const store = configureStore({
  reducer: {
    modalReducers: modalReducers,
    userReducers: userReducers,
  },
});

export default store;

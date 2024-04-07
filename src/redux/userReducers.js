import { createSlice } from "@reduxjs/toolkit";

import {
  fetchUsersList,
  handleSaveUser,
  fetchUserById,
  deleteUser,
} from "./thunk";

const userSlice = createSlice({
  name: "users",
  initialState: {
    usersList: [],
    userSelected: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersList.fulfilled, (state, action) => {
        state.usersList = action.payload;
      })
      .addCase(handleSaveUser.fulfilled, (state, action) => {
        state.usersList = action.payload;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.userSelected = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        console.log("delete success...................................");
      });
  },
});

export const { reducer: userReducers } = userSlice;

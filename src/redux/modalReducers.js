import { createReducer } from "@reduxjs/toolkit";

import {
  setEditModalOpen,
  setCreateModalOpen,
  setDeleteModalOpen,
  setLoading,
  toggleSideBar,
  setUser,
} from "./actions";

const initialValue = {
  user: {},
  isEditModalOpen: false,
  isCreateModalOpen: false,
  isDeleteModalOpen: false,
  isLoading: false,
  isSidebarOpen: true,
};

export const modalReducers = createReducer(initialValue, (builder) =>
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setEditModalOpen, (state, action) => {
      state.isEditModalOpen = action.payload;
    })
    .addCase(setCreateModalOpen, (state, action) => {
      state.isCreateModalOpen = action.payload;
    })
    .addCase(setDeleteModalOpen, (state, action) => {
      state.isDeleteModalOpen = action.payload;
    })
    .addCase(setLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(toggleSideBar, (state, action) => {
      state.isSidebarOpen = action.payload;
    })
);


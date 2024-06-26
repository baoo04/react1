import { createAction } from "@reduxjs/toolkit";

const setUser = createAction("setUser");

const addUser = createAction("addUser");

const setEditModalOpen = createAction("editModalOpen");

const setCreateModalOpen = createAction("createModalOpen");

const setDeleteModalOpen = createAction("setDeleteModalOpen");

const setLoading = createAction("setLoading");

const toggleSideBar = createAction("toggleSideBar");

export {
  addUser,
  setEditModalOpen,
  setCreateModalOpen,
  setDeleteModalOpen,
  setLoading,
  toggleSideBar,
  setUser,
};

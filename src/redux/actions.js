import { createAction } from "@reduxjs/toolkit";

const increase = createAction("increase");

const loadUser = createAction("load");

const decrease = createAction("decrease");

const addUser = createAction("addUser");

const EditUSer = createAction("EditUser");

const editModalOpen = createAction("editModalOpen");

const createModalOpen = createAction("createModalOpen");

const setPreviousUser = createAction("setPreviousUser");

const setUserId = createAction("setUserId");

const setAction = createAction("setAction");

const setNotification = createAction("setNotification");

const setDeleteModalOpen = createAction("setDeleteModalOpen");

const setLoading = createAction("setLoading");

export {
    increase,
    decrease,
    addUser,
    loadUser,
    EditUSer,
    editModalOpen,
    createModalOpen,
    setPreviousUser,
    setUserId,
    setAction,
    setNotification,
    setDeleteModalOpen,
    setLoading,
};

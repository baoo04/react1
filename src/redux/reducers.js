import { createReducer } from "@reduxjs/toolkit";
import {
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
} from "./actions";

const initialValue = {
    users: [],
    user: {},
    statusEdit: false,
    statusCreate: false,
    prevUser: {},
    userIdSelected: null,
    action: "",
    notification: "",
    statusDelete: false,
};

const reducers = createReducer(initialValue, (builder) =>
    builder
        .addCase(addUser, (state, action) => {
            state.users.push(action.payload);
        })
        .addCase(decrease, (state, action) => {
            state.count -= 1;
        })
        .addCase(loadUser, (state, action) => {
            state.users = action.payload;
        })
        .addCase(EditUSer, (state, action) => {
            state.user = action.payload;
        })
        .addCase(editModalOpen, (state, action) => {
            state.statusEdit = action.payload;
        })
        .addCase(createModalOpen, (state, action) => {
            state.statusCreate = action.payload;
        })
        .addCase(setPreviousUser, (state, action) => {
            state.prevUser = action.payload;
        })
        .addCase(setUserId, (state, action) => {
            state.userIdSelected = action.payload;
        })
        .addCase(setAction, (state, action) => {
            state.action = action.payload;
        })
        .addCase(setNotification, (state, action) => {
            state.notification = action.payload;
        })
        .addCase(setDeleteModalOpen, (state, action) => {
            state.statusDelete = action.payload;
        })
);

export default reducers;

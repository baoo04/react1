import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserById = createAsyncThunk(
  "user/fetchById",
  async (userId) => {
    const response = await fetch(
      `https://60becf8e6035840017c17a48.mockapi.io/users/${userId}`
    );
    return await response.json();
  }
);

export const fetchUsersList = createAsyncThunk(
  "usersList/fetchUsersList",
  async () => {
    const response = await axios.get(
      "https://60becf8e6035840017c17a48.mockapi.io/users"
    );
    return await response.data;
  }
);

export const handleSaveUser = createAsyncThunk(
  "user/saveUser",
  async (data) => {
    const response = await axios.put(
      "https://60becf8e6035840017c17a48.mockapi.io/users",
      data
    );
    return await response.data;
  }
);

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  await axios.delete(`https://60becf8e6035840017c17a48.mockapi.io/users/${id}`);
});

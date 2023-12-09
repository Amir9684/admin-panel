import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { apiCall } from "../@core/auth/jwt/services/interceptor/api-call";

const initialState = {
  status: "idle",
  users: [],
  totalCount: 0,
  roles: [],
};

export const getAllUsers = createAsyncThunk("users/getAll", async (params) => {
  return apiCall("/User/UserMannage", { params });
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.users = action.payload.listUser;
        state.totalCount = action.payload.totalCount;
        state.roles = action.payload.roles;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const useUsers = () => useSelector((reducer) => reducer.users);

export default userSlice.reducer;

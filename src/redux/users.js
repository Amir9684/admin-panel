import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { apiCall } from "../@core/auth/jwt/services/interceptor/api-call";

const userAdaptor = createEntityAdapter({
  selectId: (user) => user.id,
  sortComparer: (a, b) => new Date(b.insertDate) - new Date(a.insertDate),
});

export const getAllUsers = createAsyncThunk("users/getAll", async (params) => {
  return apiCall("/User/UserMannage", { params });
});

export const userSlice = createSlice({
  name: "users",
  initialState: userAdaptor.getInitialState({ status: "idle", totalCount: 0 , roles:[] }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "success";
        userAdaptor.removeAll(state);
        userAdaptor.upsertMany(state, action.payload.listUser);
        state.totalCount = action.payload.totalCount;
        state.roles = action.payload.roles;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = userAdaptor.getSelectors((state) => state.users);

export const useUsers = () => useSelector((reducer) => reducer.users);

export default userSlice.reducer;
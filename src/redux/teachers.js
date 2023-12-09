import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { apiCall } from "../@core/auth/jwt/services/interceptor/api-call";

const initialState = {
  status: "idle",
  teachers: [],
};

export const getAllTeachers = createAsyncThunk("teachers/getAll", async () => {
  return apiCall("/Home/GetTeachers");
});

export const teacherSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllTeachers.fulfilled, (state, action) => {
        state.status = "success";
        state.teachers = action.payload;
      })
      .addCase(getAllTeachers.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const useTeachers = () => useSelector((reducer) => reducer.teachers);

export default teacherSlice.reducer;

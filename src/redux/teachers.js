import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { apiCall } from "../services/interceptor/api-call";

const teacherAdapter = createEntityAdapter({
  selectId: (teacher) => teacher.teacherId,
  sortComparer: (a, b) => a.teacherId - b.teacherId,
});

export const getAllTeachers = createAsyncThunk("teachers/getAll", async () => {
  return apiCall("/Home/GetTeachers");
});

export const teacherSlice = createSlice({
  name: "teachers",
  initialState: teacherAdapter.getInitialState({
    status: "idle",
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllTeachers.fulfilled, (state, action) => {
        state.status = "success";
        teacherAdapter.upsertMany(state, action.payload);
      })
      .addCase(getAllTeachers.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const {
  selectAll: selectAllTeachers,
  selectById: selectTeacherById,
  selectIds: selectTeachersIds,
} = teacherAdapter.getSelectors((state) => state.teachers);

export const useTeachers = () => useSelector((reducer) => reducer.teachers);

export default teacherSlice.reducer;

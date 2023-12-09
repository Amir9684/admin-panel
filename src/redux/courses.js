import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { apiCall } from "../@core/auth/jwt/services/interceptor/api-call";

const initialState = {
  status: "idle",
  courses: [],
  totalCount: 0,
};

export const getAllCourses = createAsyncThunk(
  "courses/getAll",
  async (params) => {
    return apiCall("/Course/CourseList", {
      params,
    });
  }
);

export const getTopCourses = createAsyncThunk(
  "courses/getTops",
  async (count) => {
    const params = { Count: count };
    return apiCall("/Home/GetCoursesTop", { params });
  }
);

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state, payload) => {
        state.status = "loading";
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.status = "success";
        state.courses = action.payload.courseDtos;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(getAllCourses.rejected, (state, payload) => {
        state.status = "error";
      })
      .addCase(getTopCourses.pending, (state, payload) => {
        state.status = "loading";
      })
      .addCase(getTopCourses.fulfilled, (state, action) => {
        state.status = "success";
        state.courses = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(getTopCourses.rejected, (state, payload) => {
        state.status = "error";
      });
  },
});

export const useCourses = () => useSelector((reducer) => reducer.courses);

export default courseSlice.reducer;

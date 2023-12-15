import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { apiCall } from "../services/interceptor/api-call";

const courseAdapter = createEntityAdapter({
  selectId: (course) => course.courseId,
  sortComparer: (a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate),
});

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

export const deleteCourse = createAsyncThunk(
  "course/delete",
  async (courseId, isActive) => {
    const body = { active: isActive, id: courseId };
    await apiCall.delete("/Course/DeleteCourse", body);
    return { id: courseId };
  }
);

export const activeCourse = createAsyncThunk(
  "course/activeCourse",
  async (course) => {
    const body = {
      active: true,
      id: course.courseId,
    };
    await apiCall.put("/Course/ActiveAndDeactiveCourse", body);
    return { course: { ...course, isActive: true } };
  }
);

export const deActiveCourse = createAsyncThunk(
  "course/deActiveCourse",
  async (course) => {
    const body = {
      active: false,
      id: course.courseId,
    };
    await apiCall.put("/Course/ActiveAndDeactiveCourse", body);
    return { course: { ...course, isActive: false } };
  }
);

export const courseSlice = createSlice({
  name: "courses",
  initialState: courseAdapter.getInitialState({
    status: "idle",
    totalCount: 0,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state, payload) => {
        state.status = "loading";
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.status = "success";
        courseAdapter.removeAll(state);
        courseAdapter.upsertMany(state, action.payload.courseDtos);
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
        courseAdapter.removeAll(state);
        courseAdapter.upsertMany(state, action.payload);
        state.totalCount = action.payload.length;
      })
      .addCase(getTopCourses.rejected, (state, payload) => {
        state.status = "error";
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.status = "success";
        courseAdapter.removeOne(state, action.payload.id);
        state.totalCount -= 1;
      })
      .addCase(deleteCourse.rejected, (state, payload) => {
        state.status = "error";
      })
      .addCase(activeCourse.fulfilled, (state, action) => {
        state.status = "success";
        courseAdapter.upsertOne(state, action.payload.course);
        toast.success("دوره فعال شد");
      })
      .addCase(deActiveCourse.fulfilled, (state, action) => {
        state.status = "success";
        courseAdapter.upsertOne(state, action.payload.course);
        toast.success("دوره غیر فعال شد");
      });
  },
});

export const {
  selectAll: selectAllCourses,
  selectById: selectCourseById,
  selectIds: selectCoursesIds,
} = courseAdapter.getSelectors((state) => state.courses);

export const useCourses = () => useSelector((reducer) => reducer.courses);

export default courseSlice.reducer;

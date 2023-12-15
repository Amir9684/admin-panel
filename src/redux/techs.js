import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { apiCall } from "../services/interceptor/api-call";

const techAdapter = createEntityAdapter({
  selectId: (tech) => tech.id,
  sortComparer: (a, b) => a.id - b.id,
});

export const getAllTechnologies = createAsyncThunk(
  "technology/getAll",
  async () => {
    return apiCall("/Home/GetTechnologies");
  }
);

export const updateTechnology = createAsyncThunk(
  "technology/updateTechnology",
  async (data) => {
    return apiCall.put("/Home/GetCoursesTop", data);
  }
);

export const createTechnology = createAsyncThunk(
  "technology/createTechnology",
  async () => {
    return await apiCall.post("");
  }
);

export const deleteTechnology = createAsyncThunk(
  "technology/delete",
  async (courseId, isActive) => {
    const body = { active: isActive, id: courseId };
    return apiCall
      .delete("/Course/deleteTechnology", body)
      .then((res) => ({ ...res, courseId }));
  }
);

export const technologySlice = createSlice({
  name: "technology",
  initialState: techAdapter.getInitialState({
    status: "idle",
    totalCount: 0,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTechnologies.pending, (state, payload) => {
        state.status = "loading";
      })
      .addCase(getAllTechnologies.fulfilled, (state, action) => {
        state.status = "success";
        techAdapter.upsertMany(state, action.payload);
        state.totalCount = action.payload.length;
      })
      .addCase(getAllTechnologies.rejected, (state, payload) => {
        state.status = "error";
      })
      .addCase(deleteTechnology.fulfilled, (state, action) => {
        const newArray = state.courses.filter(
          (c) => c.courseId !== action.payload.courseId
        );
        state.courses = newArray;
        state.totalCount = action.payload.length;
      })
      .addCase(deleteTechnology.rejected, (state, payload) => {
        state.status = "error";
      });
  },
});

export const {
  selectAll: selectAllTechs,
  selectById: selectTechById,
  selectIds: selectTechsIds,
} = techAdapter.getSelectors((state) => state.technology);

export const useTechnology = () => useSelector((reducer) => reducer.technology);

export default technologySlice.reducer;

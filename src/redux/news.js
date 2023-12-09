import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { apiCall } from "../@core/auth/jwt/services/interceptor/api-call";

const initialState = {
  status: "idle",
  news: [],
  totalCount: 0,
};

export const getAllNews = createAsyncThunk("news/getAll", async (params) => {
  return apiCall("/News", { params });
});

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNews.pending, (state, payload) => {
        state.status = "loading";
      })
      .addCase(getAllNews.fulfilled, (state, action) => {
        state.status = "success";
        state.news = action.payload.news;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(getAllNews.rejected, (state, payload) => {
        state.status = "error";
      });
  },
});

export const useNews = () => useSelector((reducer) => reducer.news);

export default newsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { apiCall } from "../services/interceptor/api-call";

const initialState = {
  status: "idle",
  news: [],
  params: {},
  totalCount: 0,
};

export const getAllNews = createAsyncThunk("news/getAll", async (params) => {
  const response = await apiCall("/News/AdminNewsFilterList", { params });
  return { params, data: response };
});

export const deleteNews = createAsyncThunk("news/delete", async (params) => {
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
        state.news = action.payload.data.news;
        state.params = action.payload.params;
        state.totalCount = action.payload.data.totalCount;
      })
      .addCase(getAllNews.rejected, (state, payload) => {
        state.status = "error";
      });
  },
});

export const useNews = () => useSelector((reducer) => reducer.news);

export default newsSlice.reducer;

import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { apiCall } from "../services/interceptor/api-call";

const newsAdapter = createEntityAdapter({
  selectId: (news) => news.id,
  sortComparer: (a, b) => new Date(b.insertDate) - new Date(a.insertDate),
});

export const getAllNews = createAsyncThunk("news/getAll", async (params) => {
  const newParams = {
    ...params,
    RowsOfPage: params.RowsOfPage / 2,
  };
  const activeNews = await apiCall("/News/AdminNewsFilterList?IsActive=true", {
    params: newParams,
  });
  const deActiveNews = await apiCall(
    "/News/AdminNewsFilterList?IsActive=false",
    { params: newParams }
  );
  return {
    params,
    data: {
      news: [...activeNews.news, ...deActiveNews.news],
      totalCount: activeNews.totalCount + deActiveNews.totalCount,
    },
  };
});

export const activeNews = createAsyncThunk("news/activeNews", async (news) => {
  const formData = new FormData();
  formData.append("Active", true);
  formData.append("Id", news.id);
  await apiCall.put("/News/ActiveDeactiveNews", formData).then((res) => {
    if (res.success) toast.success("بلاگ فعال شد");
  });
  return { news: { ...news, isActive: true } };
});

export const deActiveNews = createAsyncThunk(
  "news/deActiveNews",
  async (news) => {
    const formData = new FormData();
    formData.append("Active", false);
    formData.append("Id", news.id);
    await apiCall.put("/News/ActiveDeactiveNews", formData).then((res) => {
      if (res.success) toast.success("بلاگ غیر فعال شد");
    });
    return { news: { ...news, isActive: false } };
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState: newsAdapter.getInitialState({
    status: "idle",
    params: {},
    totalCount: 0,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNews.pending, (state, payload) => {
        state.status = "loading";
      })
      .addCase(getAllNews.fulfilled, (state, action) => {
        state.status = "success";
        newsAdapter.removeAll(state);
        newsAdapter.upsertMany(state, action.payload.data.news);
        state.params = action.payload.params;
        state.totalCount = action.payload.data.totalCount;
      })
      .addCase(getAllNews.rejected, (state, action) => {
        state.status = "error";
      })
      .addCase(activeNews.fulfilled, (state, action) => {
        state.status = "success";
        newsAdapter.upsertOne(state, action.payload.news);
      })
      .addCase(deActiveNews.fulfilled, (state, action) => {
        state.status = "success";
        newsAdapter.upsertOne(state, action.payload.news);
      });
  },
});

export const {
  selectAll: selectAllNews,
  selectById: selectNewsById,
  selectIds: selectNewsIds,
} = newsAdapter.getSelectors((state) => state.news);

export const useNews = () => useSelector((reducer) => reducer.news);

export default newsSlice.reducer;

import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

import { apiCall } from "../services/interceptor/api-call";

const userCommentsAdaptor = createEntityAdapter({
  selectId: (comment) => comment.commentId,
  sortComparer: (a, b) => a.replyCount - b.replyCount,
});

export const getCommentsByUserId = createAsyncThunk(
  "userComments/getCommentsByUserId",
  async (id) => {
    return apiCall(`/Course/CommentManagment` , {params:{userId : id}});
  }
);

export const userCommentsSlice = createSlice({
  name: "userComments",
  initialState: userCommentsAdaptor.getInitialState({
    state: "idle",
    totalCount: 0,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCommentsByUserId.fulfilled, (state, action) => {
        state.status = "success";
        userCommentsAdaptor.upsertMany(state, action.payload.comments);
        state.totalCount = action.payload;
      })
      .addCase(getCommentsByUserId.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const {
  selectAll: selectAllUserComments,
  selectById: selectUserCommentsById,
  selectIds: selectUserCommentsIds,
} = userCommentsAdaptor.getSelectors((state) => state.userComments);

export const useUserComments = () =>
  useSelector((reducer) => reducer.userComments);

export default userCommentsSlice.reducer;
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { apiCall } from "../services/interceptor/api-call";

const MySwal = withReactContent(Swal);

const commentsAdapter = createEntityAdapter({
  selectId: (comment) => comment.commentId || comment.id,
  sortComparer: (a, b) => b.replyCount - a.replyCount,
});

export const getCourseComments = createAsyncThunk(
  "comments/getCourseComments",
  async (params) => {
    return apiCall("/Course/CommentManagment", {
      params,
    });
  }
);

export const getNewsCommentsById = createAsyncThunk(
  "comments/getNewsComments",
  async (NewsId) => {
    return apiCall("/News/GetNewsComments", { params: { NewsId } });
  }
);

export const acceptComment = createAsyncThunk(
  "comments/acceptComment",
  async (comment) => {
    await apiCall.post(
      "/Course/AcceptCourseComment",
      {},
      { params: { CommentCourseId: comment.commentId || comment.id } }
    );
    return { ...comment, accept: true };
  }
);

export const rejectComment = createAsyncThunk(
  "comments/rejcetComment",
  async (comment) => {
    await apiCall.post(
      "Course/RejectCourseComment",
      {},
      { params: { CommentCourseId: comment.commentId || comment.id } }
    );
    return { ...comment, accept: false };
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (comment) => {
    await apiCall.delete("/Course/DeleteCourseComment", {
      params: { CourseCommandId: comment.commentId || comment.id },
    });
    return { id: comment.commentId };
  }
);

export const getCommentReplies = createAsyncThunk(
  "comments/getCommentReplies",
  async (params) => {
    return await apiCall(
      `/Course/GetCourseReplyCommnets/${params.courseId}/${params.commentId}`
    );
  }
);

export const commnetSlice = createSlice({
  name: "comments",
  initialState: commentsAdapter.getInitialState({
    status: "idle",
    totalCount: 0,
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseComments.fulfilled, (state, action) => {
        state.status = "success";
        commentsAdapter.removeAll(state);
        commentsAdapter.upsertMany(state, action.payload.comments);
        state.totalCount = action.payload.totalCount;
      })
      .addCase(getNewsCommentsById.fulfilled, (state, action) => {
        state.status = "success";
        commentsAdapter.removeAll(state);
        commentsAdapter.upsertMany(state, action.payload);
        state.totalCount = action.payload.length;
      })
      .addCase(acceptComment.fulfilled, (state, action) => {
        state.status = "success";
        commentsAdapter.upsertOne(state, action.payload);
        toast.success("کامنت تائید شد");
      })
      .addCase(rejectComment.fulfilled, (state, action) => {
        state.status = "success";
        commentsAdapter.upsertOne(state, action.payload);
        toast.success("کامنت رد شد");
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = "success";
        commentsAdapter.removeOne(state, action.payload.id);
        MySwal.fire({
          icon: "success",
          title: "عملیات موفقیت آمیز بود",
          text: "کامنت موردنظر حذف شد",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      })
      .addCase(getCommentReplies.fulfilled, (state, action) => {
        state.status = "success";
        commentsAdapter.removeAll(state);
        commentsAdapter.upsertMany(state, action.payload);
        state.totalCount = action.payload.length;
      });
  },
});

export const {
  selectAll: selectAllComments,
  selectById: selectCommentsById,
  selectIds: selectCommentsIds,
} = commentsAdapter.getSelectors((state) => state.comments);

export const useComments = () => useSelector((reducer) => reducer.comments);

export default commnetSlice.reducer;

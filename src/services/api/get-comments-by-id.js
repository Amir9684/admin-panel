import {apiCall} from "../interceptor/api-call";

export const getUserComments = async (id) => {
  try {
    const response = await apiCall.get(`/Course/CommentManagment?userId=${id}`);

    return response;
  } catch (error) {
    return false;
  }
};
import {apiCall} from "../interceptor/api-call";

export const getUserDetailById = async (id) => {
  try {
    const response = await apiCall.get("/User/UserDetails/", id);

    return response;
  } catch (error) {
    return false;
  }
};

import {apiCall} from "../interceptor/api-call";

export const createUser = async (user) => {
  try {
    const response = await apiCall.post("/User/CreateUser", user);

    return response;
  } catch (error) {
    return false;
  }
};
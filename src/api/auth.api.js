import { apiRequest } from "./api";

export const loginAPI = (data) => {
  return apiRequest("/auth/login", "POST", data);
};
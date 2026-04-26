import API from "./axios";

// CREATE
export const createUserApi = (data) => API.post("/users", data);

// READ ALL
export const getUsersApi = () => API.get("/users");

// READ ONE
export const getUserByIdApi = (id) => API.get(`/users/${id}`);

// UPDATE
export const updateUserApi = (id, data) => API.put(`/users/${id}`, data);

// DELETE
export const deleteUserApi = (id) => API.delete(`/users/${id}`);
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// CREATE TASK
export const createTask = (data) => API.post("/tasks", data);

// GET TASKS
export const getTasks = () => API.get("/tasks");

// UPDATE TASK
export const updateTask = (id, data) =>
  API.put(`/tasks/${id}`, data);

// DELETE TASK
export const deleteTask = (id) =>
  API.delete(`/tasks/${id}`);
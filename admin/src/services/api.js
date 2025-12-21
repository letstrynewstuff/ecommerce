import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
const _res = await api.get("/admin/users", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export default api;
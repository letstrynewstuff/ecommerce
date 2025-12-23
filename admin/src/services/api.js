

import axios from "axios";

// Dynamic base URL
const API_URL =
  import.meta.env.MODE === "production"
    ? "https://ecommerce-0ih0.onrender.com/api"
    : "http://localhost:5000/api";

// Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Attach ADMIN token automatically
api.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("adminToken");

    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

// src/services/api.js
import axios from "axios";

// =======================
// DYNAMIC BASE URL
// =======================
const API_URL =
  import.meta.env.MODE === "production"
    ? "https://ecommerce-0ih0.onrender.com/api" // Production Render URL
    : "http://localhost:5000/api"; // Local dev URL

// =======================
// AXIOS INSTANCE
// =======================
const api = axios.create({
  baseURL: API_URL,
});

// Automatically attach USER token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // user token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =======================
// PRODUCTS
// =======================
export const fetchProducts = async () => {
  try {
    const res = await api.get("/products");
    return res.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};

export const fetchProductsByCategory = async (category) => {
  try {
    const url = category
      ? `/products?category=${encodeURIComponent(category)}`
      : "/products";
    const res = await api.get(url);
    return res.data;
  } catch (err) {
    console.error("Error fetching products by category:", err);
    return [];
  }
};

// =======================
// USER AUTH
// =======================
export const registerUser = async ({ name, email, password }) => {
  try {
    const res = await api.post("/users/register", { name, email, password });
    return res.data;
  } catch (err) {
    console.error("Error registering user:", err);
    throw err;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const res = await api.post("/users/login", { email, password });
    return res.data;
  } catch (err) {
    console.error("Error logging in:", err);
    throw err;
  }
};

export const fetchCurrentUser = async () => {
  try {
    const res = await api.get("/users/me");
    return res.data;
  } catch (err) {
    console.error("Error fetching current user:", err);
    return null;
  }
};

// =======================
// TRACKING
// =======================
export const fetchTracking = async (trackingCode) => {
  try {
    const res = await api.get(`/locations/tracking/${trackingCode}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching tracking info:", err);
    return null;
  }
};

export default api;

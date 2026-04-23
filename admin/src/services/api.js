

// import axios from "axios";

// // Dynamic base URL
// const API_URL =
//   import.meta.env.MODE === "production"
//     ? "https://ecommerce-0ih0.onrender.com/api"
//     : "http://localhost:5000/api";

// // Axios instance
// const api = axios.create({
//   baseURL: API_URL,
// });

// // Attach ADMIN token automatically
// api.interceptors.request.use(
//   (config) => {
//     const adminToken = localStorage.getItem("adminToken");

//     if (adminToken) {
//       config.headers.Authorization = `Bearer ${adminToken}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;


import axios from "axios";

// =======================
// Dynamic base URL
// =======================
const API_URL =
  import.meta.env.MODE === "production"
    ? "https://ecommerce-0ih0.onrender.com/api"
    : "http://localhost:5000/api";

// =======================
// Axios instance
// =======================
const api = axios.create({
  baseURL: API_URL,
});

// =======================
// Attach token automatically
// =======================
api.interceptors.request.use(
  (config) => {
    // Try user token first
    const token =
      localStorage.getItem("token") || localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// =======================
// Named API function
// =======================
export const fetchCurrentUser = async (token) => {
  try {
    const res = await api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching current user:", err);
    return null;
  }
};

// =======================
// Default export
// =======================
export default api;

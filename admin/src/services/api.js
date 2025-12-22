// import axios from "axios";


// // Dynamic base URL (Render in production, localhost in dev)
// const API_URL =
//   import.meta.env.MODE === "production"
//     ? "https://ecommerce-0ih0.onrender.com/api"
//     : "http://localhost:5000/api";

// // Axios instance
// const api = axios.create({
//   baseURL: API_URL,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("authToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
// const _res = await api.get("/admin/users", {
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
//   },
// });

// export default api;


import axios from "axios";

// Dynamic base URL
const API_URL =
  import.meta.env.MODE === "production"
    ? "https://ecommerce-0ih0.onrender.com/api"
    : "http://localhost:5000/api";

// Axios instance
const adminApi = axios.create({
  baseURL: API_URL,
});

// Attach ADMIN token automatically
adminApi.interceptors.request.use(
  (config) => {
    const adminToken = localStorage.getItem("adminToken");

    if (adminToken) {
      config.headers.Authorization = `Bearer ${adminToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default adminApi;

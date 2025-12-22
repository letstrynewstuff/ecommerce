

// const API_URL = "http://localhost:5000/api";

// // --- Existing product functions ---
// export const fetchProducts = async () => {
//   try {
//     const res = await fetch(`${API_URL}/products`);
//     if (!res.ok) throw new Error("Failed to fetch products");
//     return await res.json();
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     return [];
//   }
// };
// export const fetchProductsByCategory = async (category) => {
//   try {
//     const url = category
//       ? `${API_URL}/products?category=${encodeURIComponent(category)}`
//       : `${API_URL}/products`;
//     const res = await fetch(url);
//     if (!res.ok) throw new Error("Failed to fetch products by category");
//     return await res.json();
//   } catch (err) {
//     console.error("Error fetching products by category:", err);
//     return [];
//   }
// };

// // --- USER AUTH FUNCTIONS ---

// // Register new user
// export const registerUser = async ({ name, email, password }) => {
//   try {
//     const res = await fetch(`${API_URL}/users/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password }),
//     });
//     return await res.json();
//   } catch (err) {
//     console.error("Error registering user:", err);
//     throw err;
//   }
// };

// // Login user
// export const loginUser = async ({ email, password }) => {
//   try {
//     const res = await fetch(`${API_URL}/users/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });
//     return await res.json();
//   } catch (err) {
//     console.error("Error logging in:", err);
//     throw err;
//   }
// };

// // Fetch current logged-in user (requires JWT)
// export const fetchCurrentUser = async (token) => {
//   try {
//     const res = await fetch(`${API_URL}/users/me`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (!res.ok) throw new Error("Failed to fetch user");
//     return await res.json();
//   } catch (err) {
//     console.error("Error fetching current user:", err);
//     return null;
//   }
// };


// // src/services/api.js


// const API_URL =
//   import.meta.env.NODE_ENV === "production"
//     ? "https://ecommerce-0ih0.onrender.com/api"
//     : "http://localhost:5000/api";

// // --- PRODUCTS ---
// export const fetchProducts = async () => {
//   try {
//     const res = await fetch(`${API_URL}/products`);
//     if (!res.ok) throw new Error("Failed to fetch products");
//     return await res.json();
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     return [];
//   }
// };

// export const fetchProductsByCategory = async (category) => {
//   try {
//     const url = category
//       ? `${API_URL}/products?category=${encodeURIComponent(category)}`
//       : `${API_URL}/products`;
//     const res = await fetch(url);
//     if (!res.ok) throw new Error("Failed to fetch products by category");
//     return await res.json();
//   } catch (err) {
//     console.error("Error fetching products by category:", err);
//     return [];
//   }
// };

// // --- USER AUTH ---
// export const registerUser = async ({ name, email, password }) => {
//   try {
//     const res = await fetch(`${API_URL}/users/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password }),
//     });
//     return await res.json();
//   } catch (err) {
//     console.error("Error registering user:", err);
//     throw err;
//   }
// };

// export const loginUser = async ({ email, password }) => {
//   try {
//     const res = await fetch(`${API_URL}/users/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });
//     return await res.json();
//   } catch (err) {
//     console.error("Error logging in:", err);
//     throw err;
//   }
// };

// export const fetchCurrentUser = async (token) => {
//   try {
//     const res = await fetch(`${API_URL}/users/me`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (!res.ok) throw new Error("Failed to fetch user");
//     return await res.json();
//   } catch (err) {
//     console.error("Error fetching current user:", err);
//     return null;
//   }
// };

// // --- TRACKING --- (attach your Render tracking API)
// export const fetchTracking = async (trackingCode) => {
//   try {
//     const res = await fetch(`${API_URL}/locations/tracking/${trackingCode}`);
//     if (!res.ok) throw new Error("Tracking code not found");
//     return await res.json();
//   } catch (err) {
//     console.error("Error fetching tracking info:", err);
//     return null;
//   }
// };


// src/services/api.js


const API_URL = import.meta.env.DEV
  ? import.meta.env.VITE_API_URL_DEV || "http://localhost:5000/api"
  : import.meta.env.VITE_API_URL_PROD || "https://ecommerce-0ih0.onrender.com/api";

// --- PRODUCTS ---
export const fetchProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};

export const fetchProductsByCategory = async (category) => {
  try {
    const url = category
      ? `${API_URL}/products?category=${encodeURIComponent(category)}`
      : `${API_URL}/products`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products by category");
    return await res.json();
  } catch (err) {
    console.error("Error fetching products by category:", err);
    return [];
  }
};

// --- USER AUTH ---
export const registerUser = async ({ name, email, password }) => {
  try {
    const res = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    return await res.json();
  } catch (err) {
    console.error("Error registering user:", err);
    throw err;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return await res.json();
  } catch (err) {
    console.error("Error logging in:", err);
    throw err;
  }
};

export const fetchCurrentUser = async (token) => {
  try {
    const res = await fetch(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch user");
    return await res.json();
  } catch (err) {
    console.error("Error fetching current user:", err);
    return null;
  }
};

// --- TRACKING ---
export const fetchTracking = async (trackingCode) => {
  try {
    const res = await fetch(`${API_URL}/locations/tracking/${trackingCode}`);
    if (!res.ok) throw new Error("Tracking code not found");
    return await res.json();
  } catch (err) {
    console.error("Error fetching tracking info:", err);
    return null;
  }
};

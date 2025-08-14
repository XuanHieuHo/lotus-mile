import axios from "axios";

export const http = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    "https://lotusmiles-poc-be.onrender.com/api",
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
  },
});

http.interceptors.response.use(
  (r) => r,
  (err) => {
    return Promise.reject(err);
  }
);

// Instance có token
export const httpAuth = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ??
    "https://lotusmiles-poc-be.onrender.com/api",
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
  },
});

// Thêm interceptor để tự attach token
httpAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpAuth.interceptors.response.use(
  (r) => r,
  (err) => Promise.reject(err)
);

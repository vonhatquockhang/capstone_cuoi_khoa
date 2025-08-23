import axios from "axios";

export const fetcher = axios.create({
  headers: {
    baseURL: "http://localhost:8080/api",
    "Content-Type": "application/json",
  },
});

fetcher.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

fetcher.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Token hết hạn hoặc không hợp lệ");
    }
    return Promise.reject(error);
  }
);

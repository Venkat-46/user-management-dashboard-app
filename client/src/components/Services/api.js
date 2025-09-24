import axios from "axios";

// Base Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:5000/", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for requests (optional: add auth token here)
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API functions
const api = {
  getUsers: (params) => apiClient.get("/users",{params}), 
  getUserById: (id) => apiClient.get(`/users/${id}`),
  createUser: (data) => apiClient.post("/users", data),
  updateUser: (id, data) => apiClient.put(`/users/${id}`, data),
  deleteUser: (id) => apiClient.delete(`/users/${id}`)
};

export default api;

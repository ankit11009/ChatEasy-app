import  axios from 'axios'

// export const axiosInstance=axios.create({
//     baseURL:import.meta.env.MODE==="development"? "http://localhost:8000/api/v1":"/v1",
//     withCredentials:true,
// }) 

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});



axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

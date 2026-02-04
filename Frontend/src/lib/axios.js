import  axios from 'axios'


export const axiosInstance = axios.create({
  baseURL:
    "https://chateasy-app.onrender.com/api/v1",
  withCredentials: true,
});



// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

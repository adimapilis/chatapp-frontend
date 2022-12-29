import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const getUser = (userId,accessToken) => API.get(
  `/users/${userId}`,
  {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
);
export const updateUser = (id, formData,accessToken) =>  API.patch(
  `/users/${id}`,
  formData,
  {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
);
export const getAllUser = (accessToken)=> API.get(
  '/users',
  {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
)
export const deleteUser = (accessToken)=> API.delete(
  `/users/${id}`,
  {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
)
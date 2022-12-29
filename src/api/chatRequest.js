import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:8000' });

// senderId, receiverId 
export const createChat = (data,accessToken) => API.post(
  '/chat/', 
  data,
  {
   headers: { Authorization: `Bearer ${accessToken}` }
  }
);

// userId in params
export const userChats = (id,accessToken) => API.get(
  `/chat/${id}`,
  {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
);

// userId in params
export const findChat = (userId1, userId2,accessToken) => API.get(
  `/chat/${userId1}/${userId2}`,
  {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
);

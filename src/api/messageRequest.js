import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:8000' });

// chatId, senderId, text
export const createMessage = (data,accessToken) => API.post(
  '/message/', 
  data,
  {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
);

// chatId in params
export const getChatMessage = (id,accessToken) => API.get(
  `/message/${id}`,
  {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
);

// messageId in params
export const deleteMessage = (id,accessToken) => API.delete(
  `/message/${id}`,
  {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
);
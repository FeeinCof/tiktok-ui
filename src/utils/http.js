import axios from 'axios';

const http = axios.create({
  baseURL: 'https://tiktok.fullstack.edu.vn/api/',
});

export const get = async (path, options = {}) => {
  const response = await http.get(path, options);
  return response.data;
};

export default http;

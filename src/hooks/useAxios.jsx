import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://pet-adoption-server-cz48.onrender.com',
  withCredentials: true,
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
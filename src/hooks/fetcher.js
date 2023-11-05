import axios from 'axios';

const axiosConfig = axios.create({ baseURL: process.env.BACKEND_URL || 'http://localhost:3001' });
const fetcher = (url) => axiosConfig.get(url).then((res) => res.data);

export default fetcher;
import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
  ? process.env.NEXT_PUBLIC_CONNECTION_TO_BACKEND
  : 'http://localhost:3001';

axios.defaults.baseURL = baseURL;

export default axios;
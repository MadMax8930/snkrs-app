import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_CONNECTION_TO_BACKEND || 'http://localhost:3001';
axios.defaults.adapter = ['xhr', 'http', 'https'];

export default axios;
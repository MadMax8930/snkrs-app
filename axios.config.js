import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_CONNECTION_TO_BACKEND || 'https://maxsneakers-backend.vercel.app';

export default axios;
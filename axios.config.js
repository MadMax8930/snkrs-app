import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production'
  ? process.env.NEXT_PUBLIC_CONNECTION_TO_BACKEND
  : 'http://localhost:3001';

axios.defaults.baseURL = baseURL;

// Add an interceptor for requests
axios.interceptors.request.use(
   (config) => {
     // Attach the HTTP-only cookie
     const cookies = document.cookie.split(';').map(cookie => cookie.trim());
     const tokenCookie = cookies.find(cookie => cookie.startsWith('token='));
     
     if (tokenCookie) {
       const token = tokenCookie.split('=')[1];
       config.headers.Cookie = `token=${token}`;
     }
 
     return config;
   },
   (error) => {
     return Promise.reject(error);
   }
 );

export default axios;
import axios from '../../axios.config';

const cookieOptions = { withCredentials: true };

const fetcherWithCookieAndMethod = (url, reqOptions = {}) => (
  axios({ url, ...reqOptions, ...cookieOptions })
    .then((res) => res.data)
    .catch((error) => {
      throw error.response.data;
    })
);

export default fetcherWithCookieAndMethod;
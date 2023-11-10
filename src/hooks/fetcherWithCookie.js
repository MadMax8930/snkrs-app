import axios from '../../axios.config';

const fetcherWithCookie = (url) => axios.get(url, { withCredentials: true }).then((res) => res.data);

export default fetcherWithCookie;
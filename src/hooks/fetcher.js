import axios from '../../axios.config';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default fetcher;
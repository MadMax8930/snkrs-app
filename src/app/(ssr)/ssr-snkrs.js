import axios from '../../../axios.config';
import { parse } from 'cookie';

// Fetch data on the server for useSneakers
export const fetchSneakersData = async (req) => {
  const cookies = parse(req.headers.cookie || '');
  const axiosConfig = { withCredentials: cookies.token ? true : false };
 
  try {
    const response = await axios.get(
      cookies.token ? '/api/profile/sneakers' : '/api/sneakers',
      axiosConfig
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch data on the server for useFilterSneakers
export const fetchFilterSneakersData = async (req, query1, query2, query3) => {
  const cookies = parse(req.headers.cookie || '');
  const axiosConfig = { withCredentials: cookies.token ? true : false };

  const buildFilterUrl = (resellQuery, brandQuery, dateQuery) => {
    const paramsArr = [];
    if (resellQuery) paramsArr.push(`resellIndex=${encodeURIComponent(resellQuery)}`);
    if (brandQuery) paramsArr.push(`brand=${encodeURIComponent(brandQuery)}`);
    if (dateQuery) paramsArr.push(`dateRelease=${encodeURIComponent(dateQuery)}`);
    if (paramsArr.length > 0) return '/sneakers-filter?' + paramsArr.join('&');

    return '/sneakers-filter';
  };

  const newUrl = buildFilterUrl(query1, query2, query3);

  try {
    const response = await axios.get(
      cookies.token ? '/api/profile' + newUrl : '/api' + newUrl,
      axiosConfig
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
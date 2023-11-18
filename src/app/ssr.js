import axios from '../../axios.config';

export async function fetchServerData(req) {
  const cookies = parse(req.headers.cookie || '');
  const axiosConfig = { withCredentials: cookies.token ? true : false };

  const fetchSneakersData = async () => {
    try {
      const response = await axios.get(
        cookies.token ? '/profile/sneakers' : '/sneakers',
        axiosConfig
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const fetchFilterData = async () => {
    const buildFilterUrl = (resellQuery, brandQuery, dateQuery) => {
      const paramsArr = [];
      if (resellQuery) { paramsArr.push(`resellIndex=${encodeURIComponent(resellQuery)}`); }
      if (brandQuery) { paramsArr.push(`brand=${encodeURIComponent(brandQuery)}`); }
      if (dateQuery) { paramsArr.push(`dateRelease=${encodeURIComponent(dateQuery)}`); }   
      const queryString = paramsArr.length > 0 ? `?${paramsArr.join('&')}` : '';

      return `/sneakers-filter${queryString}`;
    };

    const newUrl = buildFilterUrl('', '', ''); // Adjust parameters as needed

    try {
      const response = await axios.get(
        cookies.token ? '/profile' + newUrl : newUrl,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const initialSneakersData = await fetchSneakersData();
  const initialFilterData = await fetchFilterData();

  return { initialSneakersData, initialFilterData };
}

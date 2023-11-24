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

  try {
    const initialSneakersData = await fetchSneakersData();
    return { initialSneakersData };
  } catch (error) {
    console.error('Error fetching server data:', error);
    return { initialSneakersData: null };
  }
}

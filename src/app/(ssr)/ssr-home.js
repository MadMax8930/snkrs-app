import { fetchSneakersData, fetchFilterSneakersData } from './ssr-snkrs';

export async function fetchServerData(req, query1, query2, query3) {
  try {
    const initialSneakersData = await fetchSneakersData(req);
    console.log('Server Log: Initial Sneakers Data:', initialSneakersData);

    const initialFilterSneakersData = await fetchFilterSneakersData(req, query1, query2, query3);
    console.log('Server Log: Initial Filter Sneakers Data:', initialFilterSneakersData);

    return { initialSneakersData, initialFilterSneakersData };
  } catch (error) {
    console.error('Error fetching server data:', error);
    return { initialSneakersData: null, initialFilterSneakersData: null };
  }
};
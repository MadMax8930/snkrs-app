import useSWR from 'swr';
import fetcher from './fetcher';
import fetcherWithCookie from './fetcherWithCookie';
import swrOptions from './swrOptions';
import { useCookies } from 'react-cookie';
 
const useFilterSneakers = (query1, query2, query3) => {
   const [cookies] = useCookies(['token']);

   const buildFilterUrl = (resellQuery, brandQuery, dateQuery) => {
      const paramsArr = [];
      if (resellQuery) { paramsArr.push(`resellIndex=${encodeURIComponent(resellQuery)}`); }
      if (brandQuery) { paramsArr.push(`brand=${encodeURIComponent(brandQuery)}`); }
      if (dateQuery) { paramsArr.push(`dateRelease=${encodeURIComponent(dateQuery)}`); }   
      if (paramsArr.length > 0) { return '/sneakers-filter?' + `${paramsArr.join('&')}`; }
    
      return '/sneakers-filter'; // If no filters selected, return the base URL
   };

   const newUrl = buildFilterUrl(query1, query2, query3);

   const { data, error, isLoading, mutate } = useSWR(
      cookies.token ? '/profile' + newUrl : newUrl, 
      cookies.token ? fetcherWithCookie : fetcher, 
      swrOptions);

      console.log("API Endpoint:", cookies.token ? '/profile/sneakers-filter' : '/sneakers-filter');
 
   return { data, error, isLoading, mutate };
};
 
export default useFilterSneakers
 
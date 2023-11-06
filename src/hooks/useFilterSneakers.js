import useSWR from 'swr';
import fetcher from './fetcher';
 
const useFilterSneakers = (query1, query2, query3) => {

   const buildFilterUrl = (statusQuery, brandQuery, dateQuery) => {
      const paramsArr = [];
      const url = '/sneakers/filter';
      if (statusQuery) { paramsArr.push(`resellIndex=${encodeURIComponent(statusQuery)}`); }
      if (brandQuery) { paramsArr.push(`brand=${encodeURIComponent(brandQuery)}`); }
      if (dateQuery) { paramsArr.push(`dateRelease=${encodeURIComponent(dateQuery)}`); }   
      if (paramsArr.length > 0) { return '/sneakers/filter?' + `${paramsArr.join('&')}`; }
    
      return url; // If no filters selected, return the base URL
   };

   const newUrl = buildFilterUrl(query1, query2, query3);
   
   const { data, error, isLoading, mutate } = useSWR(newUrl, fetcher);
 
   return { 
      data, 
      error, 
      isLoading, 
      mutate 
   };
};
 
export default useFilterSneakers
 
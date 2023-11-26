import useSWR from 'swr';
import fetcher from './fetcher';
import fetcherWithCookie from './fetcherWithCookie';
import useSWROptions from './swrOptions';
import { useCookies } from 'react-cookie';

const useSneakers = () => {
   const [cookies] = useCookies(['token']);

   const { data, error, isLoading, mutate } = useSWR(
      cookies.token ? '/api/profile/sneakers' : '/api/sneakers', 
      cookies.token ? fetcherWithCookie : fetcher, 
      useSWROptions);

      // console.log("API Endpoint:", cookies.token ? '/api/profile/sneakers' : '/api/sneakers');

   return { data, error, isLoading, mutate };
};

export default useSneakers
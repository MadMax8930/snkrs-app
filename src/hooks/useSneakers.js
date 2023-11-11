import useSWR from 'swr';
import fetcher from './fetcher';
import fetcherWithCookie from './fetcherWithCookie';
import swrOptions from './swrOptions';
import { useCookies } from 'react-cookie';

const useSneakers = () => {
   const [cookies] = useCookies(['token']);

   const { data, error, isLoading, mutate } = useSWR(
      cookies.token ? '/profile/sneakers' : '/sneakers', 
      cookies.token ? fetcherWithCookie : fetcher, 
      swrOptions);

      console.log("API Endpoint:", cookies.token ? '/profile/sneakers' : '/sneakers');

   return { data, error, isLoading, mutate };
};

export default useSneakers
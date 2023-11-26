import useSWR from 'swr';
import fetcherWithCookie from './fetcherWithCookie';
import { useCookies } from 'react-cookie';

const useUserProfile = () => {
   const [cookies] = useCookies(['token']);

   const { data, error, isLoading, mutate } = useSWR(
       cookies.token ? '/api/profile' : null, fetcherWithCookie);

   return { data, error, isLoading, mutate };
};

export default useUserProfile
import useSWR from 'swr';
import fetcherWithCookie from './fetcherWithCookie';

const useUserCopped = () => {
   const { data, error, isLoading, mutate } = useSWR(
      '/profile/sneakers-copped', fetcherWithCookie);

   return { data, error, isLoading, mutate };
};

export default useUserCopped
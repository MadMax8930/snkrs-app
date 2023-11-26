import useSWR from 'swr';
import fetcherWithCookie from './fetcherWithCookie';

const useCoppedSneakers = () => {
   const { data, error, isLoading, mutate } = useSWR(
      '/api/profile/sneakers-copped', fetcherWithCookie);

   return { data, error, isLoading, mutate };
};

export default useCoppedSneakers
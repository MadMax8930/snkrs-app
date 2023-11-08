import useSWR from 'swr';
import fetcher from './fetcher';

const useSneakers = (id) => {

   const unauthenticatedUser = {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
   };

   const authenticatedUser = {
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
   };

   const swrOptions = id ? authenticatedUser : unauthenticatedUser;

   const { data, error, isLoading, mutate } = useSWR(id ? '/profile/sneakers' : '/sneakers', fetcher, swrOptions);

   return { data, error, isLoading, mutate };
};

export default useSneakers
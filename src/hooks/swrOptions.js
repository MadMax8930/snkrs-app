import { useCookies } from 'react-cookie';

const useSWROptions = () => {
   const [cookies] = useCookies(['token']);

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

   return cookies.token ? authenticatedUser : unauthenticatedUser;
};

export default useSWROptions
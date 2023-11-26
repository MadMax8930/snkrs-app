import useSWR from 'swr';
import fetcherWithCookie from './fetcherWithCookie';

const useNotificationsForSneaker = (sneakerId) => {
   const { data, error, isLoading, mutate } = useSWR(
      `/api/profile/notifications/sneakers/${sneakerId}`, fetcherWithCookie);

   return { data, error, isLoading, mutate };
};

export default useNotificationsForSneaker
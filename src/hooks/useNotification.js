import useSWR from 'swr';
import fetcherWithCookie from './fetcherWithCookie';

const useNotification = (notificationId) => {
   const { data, error, isLoading, mutate } = useSWR(
      `/profile/notifications/${notificationId}`, fetcherWithCookie);

   return { data, error, isLoading, mutate };
};

export default useNotification
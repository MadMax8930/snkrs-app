import useSWR from 'swr';
import fetcherWithCookie from './fetcherWithCookie';

const useUserProfile = () => {
  const { data, error, isLoading, mutate } = useSWR('/profile', fetcherWithCookie);

  return { data, error, isLoading, mutate };
};

export default useUserProfile;
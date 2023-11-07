import useSWR from 'swr';
import fetcher from './fetcher';

const useCurrentUser = () => {

   const { 
      data: profileData, 
      error: profileError, 
      isLoading: profileLoading, 
      mutate: profileMutate 
   } = useSWR('/profile', fetcher);

   return { profileData, profileError, profileLoading, profileMutate };
}

export default useCurrentUser
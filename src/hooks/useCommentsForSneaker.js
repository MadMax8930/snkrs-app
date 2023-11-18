import useSWR from 'swr';
import fetcher from './fetcher';

const useCommentsForSneaker = (sneakerId) => {
   const { data, error, isLoading, mutate } = useSWR(
      `/sneakers/${sneakerId}/comments`, fetcher);

   return { data, error, isLoading, mutate };
};

export default useCommentsForSneaker
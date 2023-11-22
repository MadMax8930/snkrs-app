import useSWR from 'swr';
import fetcher from './fetcher';

const useCommentsPub = (sneakerId) => {
   const { data, error, isLoading, mutate } = useSWR(
      `/sneakers/${sneakerId}/comments`, fetcher);

   return { data, error, isLoading, mutate };
};

export default useCommentsPub
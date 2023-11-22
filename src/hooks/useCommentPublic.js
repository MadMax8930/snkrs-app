import useSWR from 'swr';
import fetcher from './fetcher';

const useCommentPub = (sneakerId, commentId) => {
   const { data, error, isLoading, mutate } = useSWR(
      `/sneakers/${sneakerId}/comments/${commentId}`, fetcher);

   return { data, error, isLoading, mutate };
};

const useCommentsPub = (sneakerId) => {
   const { data, error, isLoading, mutate } = useSWR(
      `/sneakers/${sneakerId}/comments`, fetcher);

   return { data, error, isLoading, mutate };
};

export { useCommentPub, useCommentsPub }
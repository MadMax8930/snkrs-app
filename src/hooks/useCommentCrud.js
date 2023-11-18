import useSWR from 'swr';
import fetcherWithCookie from './fetcherWithCookie';

const useCommentCrud = (sneakerId, commentId) => {
   const endpoint = `/profile/sneakers/${sneakerId}/comments/${commentId}`;

   const { data, error, isLoading, mutate } = useSWR(endpoint, fetcherWithCookie);

   // GET ONE
   const getUserComment = () => fetcherWithCookie(endpoint);

   // POST ONE
   const addUserComment = (newCommentData) => {
      return fetcherWithCookie(`/profile/sneakers/${sneakerId}/comment`, {
        method: 'POST',
        body: JSON.stringify(newCommentData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
   };

   // UPDATE ONE
   const updateUserComment = (updatedCommentData) => {
      return fetcherWithCookie(endpoint, {
        method: 'PUT',
        body: JSON.stringify(updatedCommentData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
   };

   // DELETE ONE
   const deleteUserComment = () => {
      return fetcherWithCookie(endpoint, {
        method: 'DELETE',
      });
   };

   // GET ALL
   const getAllUserComments = () => fetcherWithCookie('/profile/sneakers-comments');

   return { 
      data, 
      error, 
      isLoading, 
      mutate,
      getUserComment,
      addUserComment,
      updateUserComment,
      deleteUserComment,
      getAllUserComments,
   };
};

export default useCommentCrud
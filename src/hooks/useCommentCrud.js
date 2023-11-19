import useSWR from 'swr';
import fetcherWithCookieAndMethod from './fetcherWithCookieAndMethod';

const useCommentCrud = (sneakerId, commentId) => {
  const endpoint = `/profile/sneakers/${sneakerId}/comments`;
  
  const { data: allUserComments, error: allUserCommentsError, isLoading: allUserCommentsLoading, mutate: allUserCommentsMutation } = 
  useSWR(['/profile/sneakers-comments', 'GET'], fetcherWithCookieAndMethod);

  const { data: userComment, error: userCommentError, isLoading: userCommentLoading, mutate: userCommentMutation } = 
  useSWR([`${endpoint}/${commentId}`, 'GET'], fetcherWithCookieAndMethod);

  const addUserComment = async (newCommentData) => {
    try {
      await fetcherWithCookieAndMethod(`${endpoint}`, { method: 'POST', data: newCommentData });
    } catch (error) {
      throw error;
    }
  };

  const updateUserComment = async (updatedCommentData) => {
    try {
      await fetcherWithCookieAndMethod(`${endpoint}/${commentId}`, { method: 'PUT', data: updatedCommentData });
    } catch (error) {
      throw error;
    }
  };

  const deleteUserComment = async () => {
    try {
      await fetcherWithCookieAndMethod(`${endpoint}/${commentId}`, { method: 'DELETE' });
    } catch (error) {
      throw error;
    }
  };

  return {
   allUserComments,
   allUserCommentsError,
   allUserCommentsLoading,
   allUserCommentsMutation,
   userComment,
   userCommentError,
   userCommentLoading,
   userCommentMutation,
   addUserComment,
   updateUserComment,
   deleteUserComment,
 };
};

export default useCommentCrud
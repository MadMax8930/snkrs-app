import fetcherWithCookieAndMethod from './fetcherWithCookieAndMethod';

const useCommentCrud = (sneakerId, commentId) => {
  const endpoint = `/api/profile/sneakers/${sneakerId}/comments`;

  const getUserComment = async () => {
    try {
      await fetcherWithCookieAndMethod(`${endpoint}/${commentId}`, { method: 'GET'});
    } catch (error) {
      throw error;
    }
  };

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
    getUserComment,
    addUserComment,
    updateUserComment,
    deleteUserComment,
  };
};

export default useCommentCrud
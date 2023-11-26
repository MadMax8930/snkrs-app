import axios from '../../axios.config';

const useToggle = () => {
   const toggle = async (sneakerId) => {
      try {
         const updatedData = await axios.patch(
            `/api/profile/sneakers/${sneakerId}/toggle`, null, { withCredentials: true });
         return updatedData;
      } catch (error) {
         throw new Error('Error toggling:', error);
      }
   };

   return { toggle };
};

export default useToggle
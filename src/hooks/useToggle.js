import useSWR from 'swr';
import axios from '../../axios.config';

const useToggle = (id) => {
   const { data, error, isLoading, mutate } = useSWR(
      `/profile/sneakers/${id}/toggle`,
      (url) => axios.patch(url, null, { withCredentials: true }).then((res) => res.data)
   );
   return { data, error, isLoading, mutate };
};

export default useToggle
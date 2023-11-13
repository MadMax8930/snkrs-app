import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';

const useCleanupExpiredToken = () => {
   const [cookies, _, removeCookie] = useCookies(['token']);

   useEffect(() => {
      const cleanupToken = () => {
         // Remove expired tokens
         const token = cookies['token'];
         const currentUNIXTimestamp = Math.floor(Date.now() / 1000);

         if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp && currentUNIXTimestamp > decodedToken.exp) {
               removeCookie('token');
            }
         }
      };

      cleanupToken();
   }, [cookies, removeCookie]);
};

export default useCleanupExpiredToken

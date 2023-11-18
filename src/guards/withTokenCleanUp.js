import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import { LoaderGif } from '@/components';

// Higher-order component (guard)
export const withTokenCleanup = (WrappedComponent) => {
  const TokenCleanupHOC = (props) => {
     const [isLoading, setIsLoading] = useState(true);
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
                 setIsLoading(false);
              } else {
                 setIsLoading(false);
              }
           } else { 
              setIsLoading(false);
           }
        };
        
        cleanupToken();
     }, [cookies, removeCookie]);

     if (isLoading) { return <LoaderGif />; }

     return <WrappedComponent {...props} />;
  };

  TokenCleanupHOC.displayName = `withTokenCleanup(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return TokenCleanupHOC;
};

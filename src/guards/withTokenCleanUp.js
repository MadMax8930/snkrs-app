import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import { LoaderLayer } from '@/components';
import { useRouter } from 'next/navigation';

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
              }
           }
           setIsLoading(false);
        };
        
        cleanupToken();
     }, [cookies, removeCookie]);

     if (isLoading) { return <LoaderLayer />; }

     return <WrappedComponent {...props} />;
  };

  TokenCleanupHOC.displayName = `withTokenCleanup(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return TokenCleanupHOC;
};

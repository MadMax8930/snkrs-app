import axios from '../../axios.config';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/UserContext';
import { LoaderGif } from '@/components';
import { useCookies } from 'react-cookie';

// Higher-order component (guard)
export const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
     const { user, setUser } = useContext(UserContext);
     const [cookies] = useCookies(['token']);
     const router = useRouter();

     useEffect(() => {
       const fetchUserProfile = async () => {
          try {
            const response = await axios.get('/api/profile', { withCredentials: true });
            setUser(response.data);
          } catch (error) {
            console.error('Error fetching user profile', error);
          }
       };

       if (!cookies.token) {
         router.push('/auth?variant=register');
       } else {
         fetchUserProfile();
       }
     }, [cookies.token, router, setUser]);

     if (!cookies.token || !user?._id) return <LoaderGif />;

     return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return ComponentWithAuth;
};
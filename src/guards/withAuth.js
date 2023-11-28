import axios from '../../axios.config';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/UserContext';
import { LoaderLayer } from '@/components';
import { useCookies } from 'react-cookie';
import useUserProfile from '@/hooks/useUserProfile';

// Higher-order component (guard)
export const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
     const { user, setUser } = useContext(UserContext);
   //   const { data: profileData, error: errorFetching, isLoading: isLoadingProfile } = useUserProfile();
     const [cookies] = useCookies(['token']);
     const router = useRouter();
  
   //   useEffect(() => {
   //     if (profileData) setUser(profileData);
   //   }, [profileData, setUser]);

     useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          if (cookies.token) {
            const response = await axios.get('/api/profile', {
              withCredentials: true,
            });
            setUser(response.data);
          }
        } catch (error) {
          console.error('Error fetching user profile', error);
        }
      };

      fetchUserProfile();
    }, [cookies.token, setUser]);

     useEffect(() => {
       const checkAuthentication = async () => {
         try {
            console.log('Cookies:', cookies); 
            if (!cookies.token) {
               console.log('Redirecting to /auth');
               router.push('/auth');
            }
         } catch (error) {
            console.error('Error redirecting', error);
         }
       };

       checkAuthentication();
     }, [cookies.token, router]);

   //   if (isLoadingProfile) return <LoaderLayer />;
     if (!user._id) { 
      console.log('User not authenticated. Showing LoaderLayer.');
      return <LoaderLayer />;
     }

     console.log('User authenticated. Rendering WrappedComponent.');
     return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return ComponentWithAuth;
};
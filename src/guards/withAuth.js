import React, { useContext, useEffect } from 'react';
import axios from '../../axios.config';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/UserContext';
import { LoaderLayer } from '@/components';
import { useCookies } from 'react-cookie';
import useUserProfile from '@/hooks/useUserProfile';

// Higher-order component (guard)
export const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
     const { user, setUser } = useContext(UserContext);
     const { data: profileData, isLoading: isLoadingProfile } = useUserProfile();
     const [cookies] = useCookies(['token']);
     const router = useRouter();

     console.log('User - AUTH:', user, "cook", cookies.token);
  
     useEffect(() => {
      const fetchData = async () => {
        try {
          const profileResponse = await axios.get('/api/profile'); // Adjust the API endpoint as needed
          setUser(profileResponse.data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };
    
      fetchData();
    }, [setUser]);

     useEffect(() => {
       if (!cookies.token) {
         const timer = setTimeout(() => router.push('/auth?variant=register'), 3500);
         return () => clearTimeout(timer);
       }
     }, [cookies.token, router]);

     
     if (isLoadingProfile) return <LoaderLayer />;

     return user && user._id ? <WrappedComponent {...props} /> : <LoaderLayer />;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return ComponentWithAuth;
};
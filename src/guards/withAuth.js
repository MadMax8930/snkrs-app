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
     const { data: profileData, error: errorFetching, isLoading: isLoadingProfile } = useUserProfile();
     const [cookies] = useCookies(['token']);
     const router = useRouter();

     useEffect(() => {
         const fetchData = async () => {
         const profileResponse = await axios.get('/api/profile');
         const userData = profileResponse.data;
         setUser(userData);

         if (cookies.token) {
            fetchData();
         }
      }
    }, [cookies.token, setUser]);

    console.log("user login", user);

     useEffect(() => {
      if (!user._id) {
        router.push('/auth?variant=register');
        return;
      }
    }, [user._id, router]);

     return user && user._id ? <WrappedComponent {...props} /> : <LoaderLayer />;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return ComponentWithAuth;
};
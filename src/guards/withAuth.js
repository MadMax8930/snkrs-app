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
      if (profileData) setUser(profileData);
    }, [profileData, setUser]);

     useEffect(() => {
      if (!cookies.token) {
        router.push('/auth?variant=register');
        return;
      }
    }, [cookies.token, router]);
    console.log('tok', cookies.token)

     return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return ComponentWithAuth;
};
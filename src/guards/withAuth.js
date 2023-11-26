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
       if (profileData) {
         setUser(profileData);
       }
     }, [profileData, setUser]);

     useEffect(() => {
       if (!cookies.token) {
         const timer = setTimeout(() => router.push('/auth?variant=register'), 3500);
         return () => clearTimeout(timer);
       }
     }, [cookies.token, router]);

     if (isLoadingProfile) return <LoaderLayer />;

     console.log('Userr:', user);

     return cookies.token ? <WrappedComponent {...props} /> : <LoaderLayer />;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return ComponentWithAuth;
};
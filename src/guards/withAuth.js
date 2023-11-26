import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/context/UserContext';
import { LoaderLayer } from '@/components';
import { useCookies } from 'react-cookie';
import useUserProfile from '@/hooks/useUserProfile';

// Higher-order component (guard)
export const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
     const { setUser } = useContext(UserContext);
     const { data: profileData, isLoading: isLoadingProfile } = useUserProfile();
     const [cookies] = useCookies(['token']);
 
     useEffect(() => {
       if (profileData) setUser(profileData);
     }, [profileData, setUser]);

     if (isLoadingProfile) return <LoaderLayer />;

     return cookies.token ? <WrappedComponent {...props} /> : <LoaderLayer />;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return ComponentWithAuth;
};
import { useRouter } from 'next/navigation';
import { useContext, useState, useEffect } from 'react';
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
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       if (profileData) {
         setUser(profileData);
         setLoading(false); // Set loading to false after user data is updated
       }
       console.log('User1:', user);
     }, [profileData, setUser]);

     useEffect(() => {
       if (!cookies.token || errorFetching) {
         const timer = setTimeout(() => router.push('/auth?variant=register'), 3500);
         return () => clearTimeout(timer);
       }
     }, [cookies.token, errorFetching, router]);

     if (isLoadingProfile || loading) return <LoaderLayer />;

     console.log('User:', user);

     return user && user._id ? <WrappedComponent {...props} /> : <LoaderLayer />;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return ComponentWithAuth;
};
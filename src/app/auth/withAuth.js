import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/context/UserContext';
import { LoaderLayer } from '@/components';
import useUserProfile from '@/hooks/useUserProfile';

// Higher-order component (guard)
export const withAuth = (WrappedComponent) => {
  return (props) => {

    const router = useRouter();
    const { user, setUser } = useContext(UserContext);
    const { data: profileData, error: errorFetching, isLoading: isLoadingProfile } = useUserProfile();

    useEffect(() => {
      if (profileData) { setUser(profileData); }
    }, [profileData]);

    useEffect(() => {
      if (errorFetching) {
         const timer = setTimeout(() => {
            router.push('/auth?variant=register');
         }, 1000);
         return () => clearTimeout(timer);
      }
    }, [errorFetching, router]);

    if (isLoadingProfile) { return <LoaderLayer /> }

    return user._id ? <WrappedComponent {...props} /> : <LoaderLayer/>;
  }
}

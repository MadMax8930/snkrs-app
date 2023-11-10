import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/context/UserContext';
import { Loader, NotFound } from '@/components';
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
      if (errorFetching) { router.push('/auth?variant=register'); }
    }, [errorFetching, router]);

    if (isLoadingProfile) { return <div className='pt-24'><Loader /></div> }

    return user && user._id ? <WrappedComponent {...props} /> : <NotFound />;
  }
}

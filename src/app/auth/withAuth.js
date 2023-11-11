import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { UserContext } from '@/context/UserContext';
import { LoaderLayer } from '@/components';
import { useCookies } from 'react-cookie';
import useUserProfile from '@/hooks/useUserProfile';

// Higher-order component (guard)
export const withAuth = (WrappedComponent) => {
  return (props) => {

    const router = useRouter();
    const { user, setUser } = useContext(UserContext);
    const { data: profileData, isLoading: isLoadingProfile } = useUserProfile();
    const [cookies] = useCookies(['token']);

    useEffect(() => {
      if (profileData) { setUser(profileData); }
    }, [profileData]);

    useEffect(() => {
      if (!cookies.token) {
         const timer = setTimeout(() => {
            router.push('/auth?variant=register');
         }, 1000);
         return () => clearTimeout(timer);
      }
    }, [cookies.token, router]);

    if (isLoadingProfile) { return <LoaderLayer /> }

    return user._id ? <WrappedComponent {...props} /> : <LoaderLayer/>;
  }
}

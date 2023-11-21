import { useContext, useEffect } from 'react';
import { UserContext } from '@/context/UserContext';
import { LoaderGif, NotFound } from '@/components';
import useUserProfile from '@/hooks/useUserProfile';

// Higher-order component (guard)
export const withUserFetch = (WrappedComponent) => {
  const ComponentWithUserState = (props) => {
     const { user, setUser } = useContext(UserContext);
     const { data: profileData, error: errorFetching, isLoading: isLoadingProfile, mutate: mutateProfile } = useUserProfile();

     useEffect(() => {
       if (profileData) {
          setUser(profileData);
       }
     }, [setUser, profileData]);

     useEffect(() => {
       if (!user._id) {
          setUser('');
          mutateProfile();
       }
     }, [user._id, setUser, mutateProfile]);

     if (errorFetching) return <NotFound />;
     if (isLoadingProfile) return <LoaderGif />;

     return <WrappedComponent {...props} />;
  };

  ComponentWithUserState.displayName = `withUserFetch(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return ComponentWithUserState;
};
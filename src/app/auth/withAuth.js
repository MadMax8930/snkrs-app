import { useContext, useEffect } from 'react';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';

// Higher-order component (guard)
export const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
      if (!user) { router.push('/auth?variant=register'); }
    }, [user, router]);

    return user ? <WrappedComponent {...props} /> : null;
  }
}

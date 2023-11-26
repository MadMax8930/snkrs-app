import axios from '../../axios.config';
import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/UserContext';
import { LoaderLayer } from '@/components';
import { useCookies } from 'react-cookie';

// Higher-order component (guard)
export const withAuth = (WrappedComponent) => {
  const ComponentWithAuth = (props) => {
     const { user, setUser } = useContext(UserContext);
     const [loading, setLoading] = useState(true);
     const [cookies] = useCookies(['token']);
     const router = useRouter();

     console.log('User - AUTH:', user, "cook", cookies.token);
  
     useEffect(() => {
      const fetchData = async () => {
        try {
          console.log('Fetching data...');
          if (cookies.token) {
            const profileResponse = await axios.get('/api/profile');
            console.log('Profile data:', profileResponse.data);
            setUser(profileResponse.data);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        } finally {
          console.log('Setting loading to false');
          setLoading(false);
        }
      };
    
      console.log('Checking token:', cookies.token);
    
      if (!cookies.token) {
        console.log('No token, redirecting to auth');
        router.push('/auth?variant=register');
        return;
      }
    
      fetchData();
    }, [setUser, cookies.token, router]);
     
     if (loading) return <LoaderLayer />;

     return cookies.token ? <WrappedComponent {...props} /> : <LoaderLayer />;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return ComponentWithAuth;
};
"use client";
import useUserProfile from '@/hooks/useUserProfile';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '@/context/UserContext';
import { Loader } from '@/components';
import styles from './account.module.css';
import { withAuth } from '../auth/withAuth';

const AccountPage = () => {
   const { user, setUser, clearUser } = useContext(UserContext);
   const { data: profileData, isLoading: isLoadingProfile } = useUserProfile();

   useEffect(() => {
      if (profileData) { setUser(profileData) }
   }, [profileData]);

   if (isLoadingProfile) { return <div className={styles.container}><Loader /></div> }
   console.log({user});
  
  return (
    <div className={styles.container}>
      <h1>Authenticated user</h1>
      <p>User ID: {user._id}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Profile Picture: {user.profilePic || null}</p>
      {user.notifications.map(notif => <p>{notif}</p>)}
      <button onClick={clearUser}>Logout</button> 
    </div>
  )
}

export default AccountPage
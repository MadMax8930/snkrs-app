"use client";
import React, { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { withAuth } from '../auth/withAuth';
import styles from './account.module.css';

const AccountPage = () => {
   const router = useRouter();
   const { user, clearUser } = useContext(UserContext);
  
   const handleLogout = () => {
      clearUser(() => { router.push('/auth?variant=login') });
   };

   console.log({user});
  
  return (
    <div className={styles.infoContainer}>
      <h1>Authenticated user</h1>
      <p>User ID: {user._id}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Profile Picture: {user.profilePic || null}</p>
      {user.notifications.map((notif, index) => (
         <p key={index}>{notif}</p>)
      )}
      <button onClick={handleLogout}>Logout</button> 
    </div>
  )
}

export default withAuth(AccountPage)
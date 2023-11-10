"use client";
import React, { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import styles from './account.module.css';
import { withAuth } from '../auth/withAuth';

const AccountPage = () => {
   const { user, clearUser } = useContext(UserContext);
  
   console.log({user});
  
  return (
    <div className={styles.container}>
      <h1>Authenticated user</h1>
      <p>User ID: {user._id}</p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Profile Picture: {user.profilePic || null}</p>
      {user.notifications.map((notif, index) => (
         <p key={index}>{notif}</p>)
      )}
      <button onClick={clearUser}>Logout</button> 
    </div>
  )
}

export default withAuth(AccountPage)
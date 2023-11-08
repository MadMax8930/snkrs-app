"use client";
import React, { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import styles from './profile.module.css';

const Profile = () => {
   const { user, clearUser } = useContext(UserContext);

  return (
    <div className={styles.container}>
      {user ? (
        <div>
          <p>Authenticated user</p>
          <p>User ID: {user._id}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Profile Picture: {user.profilePic}</p>
          <button onClick={clearUser}>Logout</button>
        </div>
      ) : (
        <p>Account page (not authenticated)</p>
      )}
    </div>
  )
}

export default Profile
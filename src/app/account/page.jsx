"use client";
import React, { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { Profile } from '@/components';
import { withAuth } from '../auth/withAuth';
import styles from './account.module.css';

const AccountPage = () => {
   const { user } = useContext(UserContext);
   console.log("user-account", {user}, user._id);
  
  return (
    <div className={styles.container}>
      <Profile />
    </div>
  )
}

export default withAuth(AccountPage)
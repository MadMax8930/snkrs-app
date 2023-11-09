"use client";
import React from 'react';
import { Profile } from '@/components';
import { withAuth } from '../auth/withAuth';
import styles from './account.module.css';

const AccountPage = () => {
  return (
    <div className={styles.container}>
      <Profile />
    </div>
  )
}

export default withAuth(AccountPage)
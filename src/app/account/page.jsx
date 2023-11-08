import React from 'react';
import styles from './account.module.css';
import { Profile } from '@/components';

const AccountPage = () => {
  return (
    <div className={styles.container}>
      <Profile />
    </div>
  )
}

export default AccountPage
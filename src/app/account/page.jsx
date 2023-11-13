"use client";
import React, { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import useUserCopped from '@/hooks/useUserCopped';
import { Profile, CoppedSnkrs, LoaderLayer } from '@/components';
import { withAuth } from '@/guards/withAuth';
import styles from './account.module.css';

const AccountPage = () => {
   const { user } = useContext(UserContext);
   const { data: sneakers, isLoading: isLoadingSneakers } = useUserCopped();

   if (isLoadingSneakers) { return <LoaderLayer /> }
   console.log("user-account", {user}, user._id);
  
  return (
    <div className={styles.container}>
      <Profile />
      <CoppedSnkrs sneakersCopped={sneakers} isLoadingCopped={isLoadingSneakers} />
    </div>
  )
}

export default withAuth(AccountPage)
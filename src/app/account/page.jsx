"use client";
import React, { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import useCoppedSneakers from '@/hooks/useCoppedSneakers';
import { Profile, CoppedSnkrs, LoaderLayer } from '@/components';
import { withAuth } from '@/guards/withAuth';
import styles from './account.module.css';

const AccountPage = () => {
   const { user } = useContext(UserContext);
   const { data: sneakersCopped, isLoading: isLoadingCopped } = useCoppedSneakers();

   if (isLoadingCopped) { return <LoaderLayer /> }
   console.log("user-account", {user}, user._id);
  
  return (
    <div className={styles.container}>
      <Profile />
      <CoppedSnkrs sneakers={sneakersCopped} isLoading={isLoadingCopped} />
    </div>
  )
}

export default withAuth(AccountPage)
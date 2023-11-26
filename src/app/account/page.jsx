"use client";
import React, { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import useCoppedSneakers from '@/hooks/useCoppedSneakers';
import { Profile, CoppedSnkrs, LoaderLayer } from '@/components';

const AccountPage = () => {
   const { data: sneakersCopped, isLoading: isLoadingCopped, mutate: mutateCopped } = useCoppedSneakers();
   const { user } = useContext(UserContext);

   console.log("user-account", {user}, user._id);
   if (isLoadingCopped) { return <LoaderLayer /> }

  
  return (
    <>
      <Profile />
      <CoppedSnkrs sneakers={sneakersCopped} isLoading={isLoadingCopped} mutate={mutateCopped} />
    </>
  )
}

export default AccountPage
"use client";
import React from 'react';
import useCoppedSneakers from '@/hooks/useCoppedSneakers';
import { Profile, CoppedSnkrs, LoaderLayer } from '@/components';
import { withAuth } from '@/guards/withAuth';

const AccountPage = () => {
   const { data: sneakersCopped, isLoading: isLoadingCopped } = useCoppedSneakers();
   if (isLoadingCopped) { return <LoaderLayer /> }
  
  return (
    <div className='pt-20'>
      <Profile />
      <CoppedSnkrs sneakers={sneakersCopped} isLoading={isLoadingCopped} />
    </div>
  )
}

export default withAuth(AccountPage)
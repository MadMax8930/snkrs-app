"use client";
import React from 'react';
import useCoppedSneakers from '@/hooks/useCoppedSneakers';
import { Profile, CoppedSnkrs, LoaderLayer } from '@/components';
import { withUserFetch } from '@/guards/withUserFetch';

const AccountPage = () => {
   const { data: sneakersCopped, isLoading: isLoadingCopped, mutate: mutateCopped } = useCoppedSneakers();
   if (isLoadingCopped) { return <LoaderLayer /> }

  return (
    <>
      <Profile />
      <CoppedSnkrs sneakers={sneakersCopped} isLoading={isLoadingCopped} mutate={mutateCopped} />
    </>
  )
}

export default withUserFetch(AccountPage)
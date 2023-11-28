"use client";
import React, { useState } from 'react';
import useCoppedSneakers from '@/hooks/useCoppedSneakers';
import { Profile, CoppedSnkrs, LoaderLayer } from '@/components';

const AccountPage = () => {
   const [isLoadingProfile, setIsLoadingProfile] = useState(false);
   const { data: sneakersCopped, isLoading: isLoadingCopped, mutate: mutateCopped } = useCoppedSneakers();
   if (isLoadingCopped || isLoadingProfile) { return <LoaderLayer /> }

  return (
    <>
      <Profile loading={isLoadingProfile} setLoading={setIsLoadingProfile} />
      <CoppedSnkrs sneakers={sneakersCopped} isLoading={isLoadingCopped} mutate={mutateCopped} />
    </>
  )
}

export default AccountPage
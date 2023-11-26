"use client";
import React, { useContext} from 'react';
import { UserContext } from '@/context/UserContext';
import useCoppedSneakers from '@/hooks/useCoppedSneakers';
import { Profile, CoppedSnkrs, LoaderLayer } from '@/components';
import { withUserFetch } from '@/guards/withUserFetch';

const AccountPage = () => {
   const { data: sneakersCopped, isLoading: isLoadingCopped, mutate: mutateCopped } = useCoppedSneakers();
   if (isLoadingCopped) { return <LoaderLayer /> }

   const { user, setUser } = useContext(UserContext);
   console.log("use", user, "set", setUser(user))

  return (
    <>
      <Profile />
      <CoppedSnkrs sneakers={sneakersCopped} isLoading={isLoadingCopped} mutate={mutateCopped} />
    </>
  )
}

export default withUserFetch(AccountPage)
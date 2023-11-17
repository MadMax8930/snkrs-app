"use client";
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import useSneaker from '@/hooks/useSneaker';
import { Loader, NotFound } from '@/components';
import { withTokenCleanup } from '@/guards/withTokenCleanUp';

const SneakerIdPage = () => {
   const { sneakerId } = useParams()
   const { data: fetchedSneaker, isLoading, error } = useSneaker(sneakerId);

   useEffect(() => {
      console.log('fetchedSneaker:', { fetchedSneaker });
      console.log('sneakerId:', sneakerId);
   }, [sneakerId, fetchedSneaker])

   if (isLoading) { return <Loader/>; }
   if (error || !sneakerId) { return <NotFound />; }

  return (
    <div className='pt-24'>
      {fetchedSneaker ?
         <div>
            <p>{fetchedSneaker._id}</p>
            <img src={fetchedSneaker.img} alt="Sneaker Image"/>
            <p>{fetchedSneaker.brand}</p>
            <p>{fetchedSneaker.model}</p>
            <p>{JSON.stringify(fetchedSneaker.copping)}</p>
         </div> : 
         <div>
            <Loader/>
         </div>
      } 
    </div>
  )
}

export default withTokenCleanup(SneakerIdPage)
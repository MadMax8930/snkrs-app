"use client";
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import useSneaker from '@/hooks/useSneaker';
import { Footer, Loader, Navbar, NotFound } from '@/components';
import { withTokenCleanup } from '@/guards/withTokenCleanUp';
import styles from './sneaker.module.css';

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
    <>
      <Navbar />
         <div className='pt-24'>
            {fetchedSneaker ?
               <div className={styles.container}>
                  <p>{fetchedSneaker._id}</p>
                  <p>{fetchedSneaker.brand}</p>
                  <p>{fetchedSneaker.model}</p>
                  <p>{JSON.stringify(fetchedSneaker.copping)}</p>
               </div> : 
               <div>
                  <Loader/>
               </div>
            } 
         </div>
      <Footer/>
    </>
  )
}

export default withTokenCleanup(SneakerIdPage)
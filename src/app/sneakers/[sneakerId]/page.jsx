"use client";
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import useSneaker from '@/hooks/useSneaker';
import useCommentsForSneaker from '@/hooks/useCommentsForSneaker';
import { Footer, Loader, Navbar, NotFound, CommentSection } from '@/components';
import { withTokenCleanup } from '@/guards/withTokenCleanUp';
import styles from './sneaker.module.css';

const SneakerIdPage = () => {
   const { sneakerId } = useParams()
   const { data: fetchedSneaker, isLoading: loadSneaker, error } = useSneaker(sneakerId);
   const { data: pubComments, isLoading: loadComments } = useCommentsForSneaker(sneakerId);

   useEffect(() => {
      console.log('fetchedSneaker:', { fetchedSneaker });
      console.log('sneakerId:', sneakerId);
      console.log('public comments for the shoe:', { pubComments });
   }, [sneakerId, fetchedSneaker, pubComments])

   if (loadSneaker) { return <Loader/>; }
   if (error || !sneakerId) { return <NotFound />; }

  return (
    <>
      <Navbar />
         <div className='pt-24'>

            {fetchedSneaker ? (<>
               <div className={styles.container}>
                  <p>{fetchedSneaker._id}</p>
                  <p>{fetchedSneaker.brand}</p>
                  <p>{fetchedSneaker.model}</p>
                  <p>{JSON.stringify(fetchedSneaker.copping)}</p>
               </div>
               <CommentSection comments={pubComments} load={loadComments} />    
            </>) : <Loader/>}

         </div>
      <Footer/>
    </>
  )
}

export default withTokenCleanup(SneakerIdPage)
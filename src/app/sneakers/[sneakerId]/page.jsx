"use client";
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import useSneaker from '@/hooks/useSneaker';
import useCommentsForSneaker from '@/hooks/useCommentsForSneaker';
import { Loader, NotFound, SneakerInfo, CommentPost, CommentSection } from '@/components';

const SneakerIdPage = () => {
   const { sneakerId } = useParams()
   const { data: fetchedSneaker, isLoading: loadSneaker, error: ErrorSneaker } = useSneaker(sneakerId);
   const { data: pubComments, isLoading: loadComments } = useCommentsForSneaker(sneakerId);

   useEffect(() => {
      console.log('fetchedSneaker:', { fetchedSneaker });
      console.log('sneakerId:', sneakerId);
      console.log('public comments for the shoe:', { pubComments });
   }, [sneakerId, fetchedSneaker, pubComments])

   if (loadSneaker) { return <Loader/>; }
   if (ErrorSneaker || !sneakerId) { return <NotFound />; }

  return (
    <>
      {fetchedSneaker ? (
         <div> 
            <SneakerInfo sneaker={fetchedSneaker} />
            <CommentPost forSneakerId={sneakerId} />
            <CommentSection comments={pubComments} load={loadComments} />    
         </div>) 
      : <Loader/>}
    </>
  )
}

export default SneakerIdPage
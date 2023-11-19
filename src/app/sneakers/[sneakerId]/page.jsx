"use client";
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import useSneaker from '@/hooks/useSneaker';
import useCommentsForSneaker from '@/hooks/useCommentsForSneaker';
import { LoaderLayer, NotFound, SneakerInfo, CommentPost, CommentSection } from '@/components';

const SneakerIdPage = () => {
   const { sneakerId } = useParams()
   const { data: fetchedSneaker, isLoading: loadSneaker, error: ErrorSneaker } = useSneaker(sneakerId);
   const { data: pubComments, isLoading: loadComments, mutate: mutateComments } = useCommentsForSneaker(sneakerId);

   useEffect(() => {
      console.log('fetchedSneaker:', { fetchedSneaker });
      console.log('sneakerId:', sneakerId);
      console.log('comments for the shoe:', { pubComments });
   }, [sneakerId, fetchedSneaker, pubComments])

   if (loadSneaker || loadComments) { return <LoaderLayer />; }
   if (ErrorSneaker || !sneakerId) { return <NotFound />; }

  return (
    <>
      {fetchedSneaker ? (
         <div> 
            <SneakerInfo sneaker={fetchedSneaker} />
            <CommentPost forSneakerId={sneakerId} mutate={mutateComments} />
            <CommentSection comments={pubComments} isLoading={loadComments} mutate={mutateComments} />    
         </div>) 
      : <Loader/>}
    </>
  )
}

export default SneakerIdPage
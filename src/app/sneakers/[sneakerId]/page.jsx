"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import useSneaker from '@/hooks/useSneaker';
import useCommentsForSneaker from '@/hooks/useCommentsForSneaker';
import { Loader, LoaderLayer, NotFound, PostSection, CommentSection } from '@/components';

const SneakerIdPage = () => {
   const { sneakerId } = useParams()
   const { data: fetchedSneaker, isLoading: loadSneaker, error: errorSneaker } = useSneaker(sneakerId);
   const { data: fetchedComments, isLoading: loadComments, mutate: mutateComments } = useCommentsForSneaker(sneakerId);

   const [editingComment, setEditingComment] = useState(null);
   const handleEdit = (comm) => setEditingComment(comm);

   useEffect(() => {
      console.log('fetchedSneaker:', { fetchedSneaker });
      console.log('sneakerId:', sneakerId);
      console.log('comments for the shoe:', { fetchedComments });
   }, [sneakerId, fetchedSneaker, fetchedComments])

   if (loadSneaker || loadComments) { return <LoaderLayer />; }
   if (errorSneaker || !sneakerId) { return <NotFound />; }

  return (
    <>
      {fetchedSneaker ? (
         <div> 
            <PostSection 
               forSneakerId={sneakerId} 
               sneaker={fetchedSneaker} 
               mutate={mutateComments} 
               editingComment={editingComment} 
               setEditingComment={setEditingComment} />
            <CommentSection 
               comments={fetchedComments} 
               isLoading={loadComments} 
               mutate={mutateComments} 
               onEdit={handleEdit} 
               forSneakerId={sneakerId} />    
         </div>) 
      : <Loader />}
    </>
  )
}

export default SneakerIdPage
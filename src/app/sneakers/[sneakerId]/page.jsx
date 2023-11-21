"use client";
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import useUserProfile from '@/hooks/useUserProfile';

import { useParams } from 'next/navigation';
import useSneaker from '@/hooks/useSneaker';
import useCommentsForSneaker from '@/hooks/useCommentsForSneaker';
import { Loader, LoaderLayer, NotFound, PostSection, CommentSection } from '@/components';

const SneakerIdPage = () => {
   const { user, setUser } = useContext(UserContext);
   const { data: profileData } = useUserProfile();
   useEffect(() => {
      if (profileData) setUser(profileData);
   }, [profileData, setUser]);

   const { sneakerId } = useParams()
   const { data: fetchedSneaker, isLoading: loadSneaker, error: errorSneaker } = useSneaker(sneakerId);
   const { data: fetchedComments, isLoading: loadComments, mutate: mutateComments } = useCommentsForSneaker(sneakerId);

   const [replyingComment, setReplyingComment] = useState(null);
   const [editingComment, setEditingComment] = useState(null);

   const handleReply = (comm) => setReplyingComment(comm);
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
               replyingComment={replyingComment}
               setReplyingComment={setReplyingComment}
               editingComment={editingComment} 
               setEditingComment={setEditingComment}
               authenticatedUser={user?._id} />
            <CommentSection 
               comments={fetchedComments} 
               isLoading={loadComments} 
               mutate={mutateComments} 
               onReply={handleReply}
               onEdit={handleEdit}
               forSneakerId={sneakerId}
               authenticatedUser={user?._id} />    
         </div>) 
      : <Loader />}
    </>
  )
}

export default SneakerIdPage
"use client";
import React, { useState, useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { withUserFetch } from '@/guards/withUserFetch';
import { useParams } from 'next/navigation';
import useSneaker from '@/hooks/useSneaker';
import { useCommentsPub } from '@/hooks/useCommentPublic';
import { Navbar, LoaderLayer, NotFound, PostSection, CommentSection } from '@/components';

const SneakerIdPage = () => {
   const { user } = useContext(UserContext);

   const { sneakerId } = useParams()
   const { data: fetchedSneaker, isLoading: loadSneaker, error: errorSneaker } = useSneaker(sneakerId);
   const { data: fetchedComments, isLoading: loadComments, mutate: mutateComments } = useCommentsPub(sneakerId);

   const [messageBody, setMessageBody] = useState('');
   const [parentMessageId, setParentMessageId] = useState(null);
   const [selectedCommentId, setSelectedCommentId] = useState(null);
   const [btnAction, setBtnAction] = useState(null);
   const [replyingComment, setReplyingComment] = useState(null);
   const [editingComment, setEditingComment] = useState(null);
   const handleReply = (comm) => setReplyingComment(comm);
   const handleEdit = (comm) => setEditingComment(comm);

   const handleCommentClick = (commId, action) => {
      setSelectedCommentId(commId);
      setBtnAction(action);
   };

   const cancelSend = () => {
      setParentMessageId(null);
      setEditingComment(null);
      setReplyingComment(null);   
      setSelectedCommentId(null);
      setBtnAction(null);
      setMessageBody('');
   };

   if (errorSneaker || !sneakerId) { return <NotFound />; }
   if (loadSneaker || loadComments) { return <LoaderLayer />; }

  return (
    <>
      {fetchedSneaker && fetchedComments ? (
      <section> 
         <Navbar />
         <div className='pt-[4.4rem]'> 
            <PostSection 
               forSneakerId={sneakerId}
               sneaker={fetchedSneaker}
               mutate={mutateComments} 
               replyingComment={replyingComment}
               setReplyingComment={setReplyingComment}
               editingComment={editingComment} 
               setEditingComment={setEditingComment}
               cancelSend={cancelSend}
               authenticatedUser={user?._id} 
               messageBody={messageBody}
               setMessageBody={setMessageBody}
               parentMessageId={parentMessageId}
               setParentMessageId={setParentMessageId}
               btnSelection={{
                  handleCommentClick,
                  selectedCommentId,
                  btnAction,
               }} />
            <CommentSection 
               comments={fetchedComments} 
               isLoading={loadComments} 
               mutate={mutateComments} 
               onReply={handleReply}
               onEdit={handleEdit}
               forSneakerId={sneakerId}
               authenticatedUser={user?._id}
               btnSelection={{
                  handleCommentClick,
                  selectedCommentId,
                  btnAction,
               }} />    
         </div>
      </section>) : 
      <LoaderLayer />}
    </>
  )
}

export default withUserFetch(SneakerIdPage)
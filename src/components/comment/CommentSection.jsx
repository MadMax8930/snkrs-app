"use client";
import React, { useState } from 'react';
import { Loader, NoComs, CommentCard } from '@/components';
import styles from './comment.module.css';

const CommentSection = ({ comments, isLoading, mutate, onReply, onEdit, forSneakerId, authenticatedUser }) => {
   
   const [selectedCommentId, setSelectedCommentId] = useState(null);
   const [btnAction, setBtnAction] = useState(null);

   const handleCommentClick = (commId, action) => {
      setSelectedCommentId(commId);
      setBtnAction(action);
   };
   
   if (isLoading) { return <Loader />; }
   if (!comments || comments.length === 0) { return <NoComs />; }

  return (
    <div className={styles.commentsContainer}>
       {comments.map((comment) => (
          <CommentCard key={comment._id} 
             comment={comment} 
             mutate={mutate} 
             onReply={onReply}
             onEdit={onEdit}
             forSneakerId={forSneakerId} 
             forCommentId={comment._id} 
             authenticatedUser={authenticatedUser}
             btnSelection={{
               handleCommentClick,
               isSelected: selectedCommentId === comment._id,
               btnAction,
             }}
          />
       ))}
    </div>
  )
}

export default CommentSection
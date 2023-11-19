"use client";
import React, { useEffect } from 'react';
import { Loader, NoComs, CommentCard } from '@/components';
import styles from './comment.module.css';

const CommentSection = ({ comments, isLoading, forSneakerId, mutate }) => {
   if (isLoading) { return <Loader />; }
   if (!comments || comments.length === 0) { return <NoComs />; }

   useEffect(() => { mutate() }, [comments, mutate]);

  return (
    <div className={styles.commentsContainer}>
       {comments.map((comment) => (
          <CommentCard key={comment._id} forSneakerId={forSneakerId} comment={comment} forCommentId={comment._id} mutate={mutate} />
       ))}
    </div>
  )
}

export default CommentSection
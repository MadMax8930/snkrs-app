import React from 'react';
import { Loader, NoComs, CommentCard } from '@/components';
import styles from './comment.module.css';

const CommentSection = ({ comments, isLoading, mutate, onReply, onEdit, forSneakerId }) => {
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
             forCommentId={comment._id} />
       ))}
    </div>
  )
}

export default CommentSection
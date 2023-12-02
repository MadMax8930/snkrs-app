import React from 'react';
import { Loader, CommentCard, NoItems } from '@/components';
import styles from './comment.module.css';

const CommentSection = ({ comments, isLoading, mutate, onReply, onEdit, forSneakerId, authenticatedUser, btnSelection }) => {
   if (isLoading) { return <Loader extra={'pt-48'} />; }
   if (!comments || comments.length === 0) { return <NoItems variation={'nc'} linkHref="/" title="No comments found" description="Be the first one to share your thoughts." imageSrc="/pink.gif" imageAlt="No Comment" />; }

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
               handleCommentClick: btnSelection.handleCommentClick,
               isSelected: btnSelection.selectedCommentId === comment._id,
               btnAction: btnSelection.btnAction,
             }} />
       ))}
    </div>
  )
}

export default CommentSection
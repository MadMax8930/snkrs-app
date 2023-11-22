"use client";
import React, { useEffect } from 'react';
import useCommentCrud from '@/hooks/useCommentCrud';
import useCommentPub from '@/hooks/useCommentPub';
import { Button } from '@/components';
import { faEdit, faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import { formatDate } from './utils';
import styles from './comment.module.css';

const CommentCard = ({ comment, mutate, onReply, onEdit, forSneakerId, forCommentId, authenticatedUser, btnSelection }) => {
 
   const { handleCommentClick, isSelected, btnAction } = btnSelection;
   const { deleteUserComment } = useCommentCrud(forSneakerId, forCommentId);
   const { data: parentComment } = comment.parentMessage ? useCommentPub(forSneakerId, comment.parentMessage) : { data: null };

   const handleReply = () => { 
      onReply(comment);
      handleCommentClick(comment._id, 'reply'); 
   };
   const handleEdit = () => { 
      onEdit(comment);
      handleCommentClick(comment._id, 'edit'); 
   };
   const handleDelete = async () => {
      try {
         await deleteUserComment();
         toast.success('Comment deleted successfully');
         mutate();
      } catch (error) {
         console.error('Error deleting the comment:', error);
         toast.error(`Error: ${error.message}`) 
      }
   };

   useEffect(() => {
      console.log('id:', parentComment?._id);
      console.log('message', parentComment?.message);
      console.log('parentMessage', parentComment?.parentMessage);
      console.log('parentMessage', parentComment);
   }, [parentComment])

  return (
    <div className={styles.commentContainer}>
      <div className={styles.topBetween}>
         <div className={styles.profile}>
            <img src={comment.user.profilePic} alt="Profile Picture" />
            <p>{comment.user.username}</p>
         </div>
         <p className={styles.date}>{formatDate(comment.createdAt)}</p>
      </div>

      <div className={styles.content}>{comment.message}</div>

      <div className={styles.btnContainer}>
         <Button 
            action={() => handleReply(comment._id)}
            icon={faReply}
            text="Reply to comment" 
            hover='hover:bg-green-400'
            backgroundColor={isSelected && btnAction === 'reply' ? '#16a34a' : '#525257'}
            disabled={authenticatedUser ? false : true} />
         {comment.user?._id === authenticatedUser && (
         <Button 
            action={() => handleEdit(comment._id)} 
            icon={faEdit} 
            text="Edit your comment" 
            hover='hover:bg-blue-400' 
            backgroundColor={isSelected && btnAction === 'edit' ? '#eab308' : '#525257'} />)}
         {comment.user?._id === authenticatedUser && (
         <Button 
            action={() => handleDelete(comment._id)} 
            icon={faTrash} 
            text="Delete your comment" 
            hover='hover:bg-red-400' />)}
      </div>

      <div className={styles.replyContainer}>
      {comment.parentMessage && (<>
         <p className={styles.reply}>Replied to this comment id: {comment.parentMessage}</p>
         <p className={styles.reply}>Parent comment id: {parentComment?._id}</p>
         <p className={styles.reply}>user: {parentComment?.user.username}</p>
         <p className={styles.reply}>Parent message: {parentComment?.message}</p>
         </>)}
      </div>
    </div>
  )
}

export default CommentCard
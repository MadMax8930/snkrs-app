"use client";
import React from 'react';
import useCommentCrud from '@/hooks/useCommentCrud';
import { Button } from '@/components';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import { formatDate } from './utils';
import styles from './comment.module.css';

const CommentCard = ({ comment, mutate, onEdit, forSneakerId, forCommentId }) => {

   const { deleteUserComment } = useCommentCrud(forSneakerId, forCommentId);

   const handleEdit = () => { onEdit(comment); }

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

  return (
    <div className={styles.commentContainer}>
         
         <div className={styles.topBetween}>
            <div className={styles.profile}>
               <img src={comment.user.profilePic} alt="Profile Picture" />
               <p className={styles.username}>{comment.user.username}</p>
            </div>
            <p className={styles.date}>{formatDate(comment.createdAt)}</p>
         </div>

         <div className={styles.content}>{comment.message}</div>


         <div className={styles.btnActions}>
            <Button action={() => handleEdit(comment._id)} icon={faEdit} text="Edit comment" hover='hover:text-blue-200' />
            <Button action={() => handleDelete(comment._id)} icon={faTrash} text="Delete comment" hover='hover:text-yellow-200' />
         </div>

         {comment.parentMessage && (
            <p className={styles.reply}>{comment.parentMessage}</p>
         )}

    </div>
  )
}

export default CommentCard
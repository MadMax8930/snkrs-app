"use client";
import React, { useContext, useEffect } from 'react';
import { UserContext } from '@/context/UserContext';
import useUserProfile from '@/hooks/useUserProfile';
import useCommentCrud from '@/hooks/useCommentCrud';
import { Button } from '@/components';
import { faEdit, faReply, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import { formatDate } from './utils';
import styles from './comment.module.css';

const CommentCard = ({ comment, mutate, onReply, onEdit, forSneakerId, forCommentId }) => {
   const { deleteUserComment } = useCommentCrud(forSneakerId, forCommentId);

   const { user, setUser } = useContext(UserContext);
   const { data: profileData } = useUserProfile();
   useEffect(() => {
     if (profileData) setUser(profileData);
   }, [profileData, setUser]);

   const handleReply = () => { onReply(comment) };

   const handleEdit = () => { onEdit(comment) };

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
            <p>{comment.user.username}</p>
         </div>
         <p className={styles.date}>{formatDate(comment.createdAt)}</p>
      </div>

      <div className={styles.content}>{comment.message}</div>

      <div className={styles.btnActions}>
         <Button action={() => handleReply(comment._id)} icon={faReply} text="Reply to comment" hover='hover:bg-green-400' />
         {comment.user?._id === user?._id && (
         <Button action={() => handleEdit(comment._id)} icon={faEdit} text="Edit your comment" hover='hover:bg-blue-400' />)}
         {comment.user?._id === user?._id && (
         <Button action={() => handleDelete(comment._id)} icon={faTrash} text="Delete your comment" hover='hover:bg-red-400' />)}
      </div>

      {comment.parentMessage && (
         <p className={styles.reply}>{comment.parentMessage}</p>
      )}
    </div>
  )
}

export default CommentCard
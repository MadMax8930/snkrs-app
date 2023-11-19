"use client";
import React, { useEffect } from 'react';
import { Loader, Button, NoComs } from '@/components';
import { faReply, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from './utils';
import styles from './comment.module.css';

const CommentSection = ({ comments, isLoading, mutate }) => {
   if (isLoading) { return <Loader />; }
   if (!comments || comments.length === 0) { return <NoComs />; }

   useEffect(() => { mutate() }, [comments, mutate]);

  return (
    <div className={styles.commentsContainer}>
      {comments.map((comment) => (
         <div className={styles.commentContainer} key={comment._id}>
      
            <div className={styles.topBetween}>
               <div className={styles.profile}>
                  <img src={comment.user.profilePic} alt="Profile Picture" />
                  <p className={styles.username}>{comment.user.username}</p>
               </div>
               <p className={styles.date}>{formatDate(comment.createdAt)}</p>
            </div>

            <div className={styles.content}>{comment.message}</div>

       
            <div className={styles.btnActions}>
               <Button action={() => handlePost(comment._id)} icon={faReply} text="Post a reply" hover='hover:text-green-300' />
               <Button action={() => handleEdit(comment._id)} icon={faEdit} text="Edit comment" hover='hover:text-blue-200' />
               <Button action={() => handleDelete(comment._id)} icon={faTrash} text="Delete comment" hover='hover:text-yellow-200' />
            </div>

            {comment.parentMessage && (
               <p className={styles.reply}>{comment.parentMessage}</p>
            )}

         </div>
      ))}
    </div>
  )
}

export default CommentSection
"use client";
import React, { useState } from 'react';
import useCommentCrud from '@/hooks/useCommentCrud';
import { Button } from '@/components';
import { faReply, faEdit } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import styles from './comment.module.css';

const CommentAdd = ({ forSneakerId, mutate }) => {
   const { addUserComment } = useCommentCrud(forSneakerId, {});

   const [messageBody, setMessageBody] = useState('');
   const [parentMessageId, setParentMessageId] = useState(null);
   
   const handlePost = async () => {
      try {
         const newCommentData = { 
            message: messageBody, 
            ...(parentMessageId && { parentMessageId }),
         };
         await addUserComment(newCommentData);
         toast.success('Comment posted successfully');
         setMessageBody('');
         setParentMessageId(null);
         mutate();
      } catch (error) {
         console.error('Error posting the comment:', error);
         toast.error(`Error: ${error.message}`)
      }
   };

   const handleUpdate = () => {}

  return (
    <div className={styles.sticky}>
      <div className={styles.postContainer}>
         <input value={messageBody} onChange={(e) => setMessageBody(e.target.value)}/>
         <div className={styles.btnActions}>
            <Button action={handlePost} icon={faReply} text="Post comment" hover='hover:text-green-300' />
            <Button action={handleUpdate} icon={faEdit} text="Update comment" hover='hover:text-blue-200' />
         </div>
      </div>
    </div>
  )
}

export default CommentAdd
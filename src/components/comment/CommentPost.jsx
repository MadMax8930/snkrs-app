"use client";
import React, { useState } from 'react';
import { Button } from '@/components';
import { faReply, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import useCommentCrud from '@/hooks/useCommentCrud';
import { toast } from 'react-hot-toast';
import styles from './comment.module.css';

const CommentPost = ({ forSneakerId }) => {
   const { addUserComment, allUserCommentsMutation } = useCommentCrud(forSneakerId, {});

   const [messageBody, setMessageBody] = useState('');
   const [parentMessageId, setParentMessageId] = useState(null);
   
   const handlePost = async () => {
      try {
         const newCommentData = { 
            message: messageBody, 
            ...(parentMessageId && { parentMessageId }),
         };
         await addUserComment(newCommentData)
         toast.success('Comment posted successfully');
         setMessageBody('');
         setParentMessageId(null);
         allUserCommentsMutation()
      } catch (error) {
         console.error('Error posting the comment:', error);
         toast.error(`Error: ${error.message}`)
      }
   };

   const handleEdit = () => {}
   const handleDelete = () => {}

  return (
    <div className={styles.sticky}>
      <div className={styles.postContainer}>
         <input value={messageBody} onChange={(e) => setMessageBody(e.target.value)}/>
         <div className={styles.btnActions}>
            <Button action={handlePost} icon={faReply} text="Post a reply" hover='hover:text-green-300' />
            <Button action={handleEdit} icon={faEdit} text="Edit comment" hover='hover:text-blue-200' />
            <Button action={handleDelete} icon={faTrash} text="Delete comment" hover='hover:text-yellow-200' />
         </div>
      </div>
    </div>
  )
}

export default CommentPost
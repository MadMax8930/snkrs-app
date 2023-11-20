"use client";
import React, { useState, useEffect } from 'react';
import useCommentCrud from '@/hooks/useCommentCrud';
import { Button, SneakerInfo } from '@/components';
import { faReply, faCancel } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import styles from './comment.module.css';

const PostSection = ({ forSneakerId, sneaker, mutate, editingComment, setEditingComment }) => {
   const { addUserComment, updateUserComment } = useCommentCrud(forSneakerId, editingComment?._id);

   const [messageBody, setMessageBody] = useState('');
   const [parentMessageId, setParentMessageId] = useState(null);
   
   useEffect(() => {
      if (editingComment) {
        setMessageBody(editingComment.message);
        setParentMessageId(editingComment.parentMessageId);
      }
   }, [editingComment]);

   const handlePost = async () => {
      try {
         const newCommentData = { 
            message: messageBody, 
            ...(parentMessageId && { parentMessageId }),
         };
         if (editingComment) {
            await updateUserComment(newCommentData);
            toast.success('Comment updated successfully');
            setEditingComment(null);
          } else {
            await addUserComment(newCommentData);
            toast.success('Comment posted successfully');
          }
         setMessageBody('');
         setParentMessageId(null);
         mutate();
      } catch (error) {
         console.error('Error posting the comment:', error);
         toast.error(`Error: ${error.message}`)
      }
   };

  return (
    <div className={styles.sticky}>
      <SneakerInfo sneaker={sneaker}/> 
      <div className={styles.postContainer}>
         <input value={messageBody} onChange={(e) => setMessageBody(e.target.value)}/>
         <div className={styles.btnActions}>
            <Button action={handlePost} icon={faReply} text={editingComment ? 'Update comment' : 'Post comment'} hover='hover:bg-green-500' />
            {editingComment && (
               <Button action={() => setEditingComment(null)} icon={faCancel} text="Cancel edit" hover='hover:bg-red-500' />
            )}
         </div>
      </div>
    </div>
  )
}

export default PostSection
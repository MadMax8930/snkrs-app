"use client";
import React, { useState, useEffect } from 'react';
import useCommentCrud from '@/hooks/useCommentCrud';
import { Button } from '@/components';
import { faReply, faEdit } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import styles from './comment.module.css';

const PostSection = ({ forSneakerId, mutate, editingComment, setEditingComment }) => {
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
      <div className={styles.postContainer}>
         <input value={messageBody} onChange={(e) => setMessageBody(e.target.value)}/>
         <div className={styles.btnActions}>
            <Button action={handlePost} icon={faReply} text={editingComment ? 'Update comment' : 'Post comment'} hover='hover:text-green-300' />
            {/* <Button action={handleUpdate} icon={faEdit} text="Update comment" hover='hover:text-blue-200' /> */}
            {editingComment && (
               <Button action={() => setEditingComment(null)} icon={faEdit} text="Cancel edit" hover='hover:text-red-300' />
            )}
         </div>
      </div>
    </div>
  )
}

export default PostSection
"use client";
import React, { useState, useEffect } from 'react';
import useCommentCrud from '@/hooks/useCommentCrud';
import { Button, SneakerInfo } from '@/components';
import { faReply, faCancel, faEnvelope, faEdit } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import styles from './comment.module.css';

const PostSection = ({ forSneakerId, sneaker, mutate, replyingComment, setReplyingComment, editingComment, setEditingComment }) => {
   const { addUserComment, updateUserComment } = useCommentCrud(forSneakerId, editingComment?._id );
   const { addUserComment: replyUserComment } = useCommentCrud(forSneakerId, replyingComment?._id);

   const [messageBody, setMessageBody] = useState('');
   const [parentMessageId, setParentMessageId] = useState(null);
   
   useEffect(() => {
      if ((editingComment && replyingComment) 
      || (!editingComment && !replyingComment)) {
        setEditingComment(null);
        setReplyingComment(null);
      } else if (editingComment) {
        setMessageBody(editingComment.message);
        setParentMessageId(editingComment.parentMessageId);
        setReplyingComment(null);
      } else if (replyingComment) {
        setMessageBody('');
        setParentMessageId(replyingComment._id);
        setEditingComment(null);
      }
   }, [editingComment, replyingComment, setEditingComment, setReplyingComment]);
    

   const handleSend = async () => {
      try {
         if (!messageBody.trim()) {
            toast.error('Comment cannot be empty');
            return;
         }
         const commData = { 
            message: messageBody, 
            ...(parentMessageId && { parentMessageId }),
         }
         if (replyingComment) {
            await replyUserComment(commData);
            toast.success('Comment replied successfully');
            setReplyingComment(null);
         } else if (editingComment) {
            await updateUserComment(commData);
            toast.success('Comment updated successfully');
            setEditingComment(null);
         } else {
            await addUserComment(commData);
            toast.success('Comment posted successfully');
            setReplyingComment(null);
            setEditingComment(null);
         }
         setMessageBody('');
         setParentMessageId(null);
         mutate();
      } catch (error) {
         console.error('Error sending the comment:', error);
         toast.error(`Error: ${error.message}`)
      }
   };

  return (
    <div className={styles.sticky}>
      <SneakerInfo sneaker={sneaker}/> 
      <div className={styles.postContainer}>
         <input value={messageBody} onChange={(e) => setMessageBody(e.target.value)}/>
         <div className={styles.btnActions}>

            {(!editingComment && !replyingComment) && (
               <>
                 <Button action={handleSend} icon={faEnvelope} text='Post new comment' hover='hover:bg-yellow-500' />
               </>
            )}

            {editingComment && (
               <>
                 <Button action={handleSend} icon={faEdit} text='Update your comment' hover='hover:bg-blue-500' />
                 <Button action={() => setEditingComment(null)} icon={faCancel} text="Cancel edit" hover='hover:bg-red-500' />
               </>
            )}
            
            {replyingComment && (
               <>
                 <Button action={handleSend} icon={faReply} text='Reply to comment' hover='hover:bg-green-500' />
                 <Button action={() => setReplyingComment(null)} icon={faCancel} text="Cancel reply" hover='hover:bg-red-500' />
               </>
            )}
         </div>
      </div>
    </div>
  )
}

export default PostSection
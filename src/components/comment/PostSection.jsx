"use client";
import React, { useState, useEffect } from 'react';
import useCommentCrud from '@/hooks/useCommentCrud';
import { Button, SneakerInfo } from '@/components';
import { faReply, faCancel, faEnvelope, faEdit, faStar } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import styles from './comment.module.css';

const PostSection = ({ forSneakerId, sneaker, mutate, replyingComment, setReplyingComment, editingComment, setEditingComment, authenticatedUser }) => {
   const router = useRouter();
   const [messageBody, setMessageBody] = useState('');
   const [parentMessageId, setParentMessageId] = useState(null);

   const { addUserComment, updateUserComment } = useCommentCrud(forSneakerId, editingComment?._id );
   const { addUserComment: replyUserComment } = useCommentCrud(forSneakerId, replyingComment?._id);
   
   useEffect(() => {
     if (replyingComment) {   
        setEditingComment(null);
        setParentMessageId(replyingComment._id);
        setMessageBody('');
     }
   }, [replyingComment, setEditingComment]);

   useEffect(() => {
      if (editingComment) {
         setReplyingComment(null);
         setParentMessageId(editingComment.parentMessageId);
         setMessageBody(editingComment.message);
      }
   }, [editingComment, setReplyingComment]);

   const cancelSend = () => {
      if (editingComment) {
         setEditingComment(null);
      } else if (replyingComment) {
         setReplyingComment(null);
      }
   }
    

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
         toast.error(`Error: You need an account`)
      }
   };

  return (
    <div className={styles.sticky}>
      <SneakerInfo sneaker={sneaker}/> 
      <div className={styles.postContainer}>
         <input value={messageBody} onChange={(e) => setMessageBody(e.target.value)}/>
         <div className={styles.btnActions}>

            {editingComment && (
               <>
                 <Button action={handleSend} icon={faEdit} text='Update your comment' hover='hover:bg-blue-500' />
                 <Button action={cancelSend} icon={faCancel} text="Cancel edit" hover='hover:bg-red-500' />
               </>
            )}

            {replyingComment && (
               <>
                 <Button action={handleSend} icon={faReply} text='Reply to comment' hover='hover:bg-green-500' />
                 <Button action={cancelSend} icon={faCancel} text="Cancel reply" hover='hover:bg-red-500' />
               </>
            )}

            {authenticatedUser ? (
               <>
                 <Button action={handleSend} icon={faEnvelope} text='Post new comment' hover='hover:bg-yellow-500' /></>) : (<>
                 <Button action={() => router.push('/auth?variant=register')} icon={faStar} text='Register/Login' hover='hover:bg-yellow-500' /> <Button icon={faEnvelope} disabled={true} />
               </>
            )}

         </div>
      </div>
    </div>
  )
}

export default PostSection
"use client";
import React, { useEffect } from 'react';
import useCommentCrud from '@/hooks/useCommentCrud';
import { Button } from '@/components';
import { faReply, faCancel, faEnvelope, faEdit, faStar } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import styles from './comment.module.css';

const PostSection = ({ forSneakerId, sneaker, mutate, replyingComment, setReplyingComment, editingComment, setEditingComment, cancelSend, authenticatedUser, messageBody, setMessageBody, parentMessageId, setParentMessageId, btnSelection }) => {
   const router = useRouter();
   const { btnAction, selectedCommentId, handleCommentClick } = btnSelection;
   const { addUserComment, updateUserComment } = useCommentCrud(forSneakerId, editingComment?._id );
   const { addUserComment: replyUserComment } = useCommentCrud(forSneakerId, replyingComment?._id);
   
   useEffect(() => {
     if (replyingComment) {   
        setEditingComment(null);
        setParentMessageId(replyingComment._id);
     }
   }, [replyingComment, setEditingComment, setParentMessageId]);

   useEffect(() => {
      if (editingComment) {
         setReplyingComment(null);
         setParentMessageId(editingComment.parentMessageId);
         setMessageBody(editingComment.message);
      }
   }, [editingComment, setReplyingComment, setParentMessageId, setMessageBody]);

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
         } else if (editingComment) {
            await updateUserComment(commData);
            toast.success('Comment updated successfully');
         } else {
            setParentMessageId(null)
            await addUserComment(commData);
            toast.success('Comment posted successfully');
         }
         handleCommentClick(null, null);
         setEditingComment(null);
         setReplyingComment(null);
         setParentMessageId(null);
         setMessageBody('');
         mutate();
      } catch (error) {
         console.error('Error sending the comment:', error);
         toast.error(`Error: You need to be logged in.`)
      }
   };

  return (
    <div className={styles.sticky}>
      {(btnAction === 'reply' && selectedCommentId) 
         ? <p className={styles.infoContainer}>{btnAction} - {selectedCommentId}</p>
         : (btnAction === 'edit' && selectedCommentId) 
         ? <p className={styles.infoContainer} style={{ backgroundColor: '#eab308' }}>{btnAction} - {selectedCommentId}</p> 
         : null
      }
      <div className={styles.postContainer}>
         <div className={styles.postContainerInputWrapper}>
            <input className={styles.postContainerInput} placeholder={`💬  ${sneaker.name} ${sneaker.model} ...`}
               value={messageBody} onChange={(e) => setMessageBody(e.target.value)}/></div>
         <div className={styles.btnContainerTwo}>
            <img className={styles.sneakerContainer} src={sneaker.img} alt="Sneaker Id Image" />
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
                  {(btnAction === 'reply' && selectedCommentId || btnAction === 'edit' && selectedCommentId) ? 
                     <Button icon={faEnvelope} disabled={true} /> :
                     <Button action={handleSend} icon={faEnvelope} text='Post new comment' hover='hover:bg-yellow-500' />
                  }
               </>
            ) : (
               <>
                 <Button action={() => router.push('/auth?variant=register')} icon={faStar} text='Register/Login' hover='hover:bg-yellow-500' />
                 <Button icon={faEnvelope} disabled={true} />
               </>
            )}
         </div>
      </div>
    </div>
  )
}

export default PostSection
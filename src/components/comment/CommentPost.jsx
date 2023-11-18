"use client";
import React, { useState } from 'react';
import { BtnItem } from '@/components';
import { faReply, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import useCommentCrud from '@/hooks/useCommentCrud';
import { toast } from 'react-hot-toast';
import styles from './comment.module.css';

const CommentPost = ({ id }) => {
   const { addUserComment } = useCommentCrud(id, {});
   const [body, setBody] = useState('');

   const handlePost = async () => {
      try {
         await addUserComment({ message: body })
         toast.success('Comment posted successfully');
         setBody('');
      } catch (error) {
         console.error('Error posting the comment:', error);
         toast.error(`Error: ${error.message}`)
      }
   };

   const handleEdit = () => {}
   const handleDelete = () => {}

  return (
    <div className={styles.stickyContainer}>
      <div className={styles.postContainer}>
         <input value={body} onChange={(e) => setBody(e.target.value)}/>
         <div className={styles.btnActions}>
            <BtnItem action={handlePost} icon={faReply} text="Post a reply" className='bg-yellow-500' />
            <BtnItem action={handleEdit} icon={faEdit} text="Edit comment" className='bg-blue-500' />
            <BtnItem action={handleDelete} icon={faTrash} text="Delete comment" className='bg-red-600' />
         </div>
      </div>
    </div>
  )
}

export default CommentPost
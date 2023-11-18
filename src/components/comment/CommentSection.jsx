import React, { useEffect } from 'react';
import { Loader, BtnItem } from '@/components';
import { faReply, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './comment.module.css';

const CommentSection = ({ comments, load }) => {

   useEffect(() => {
      console.log('comment section:', { comments });
   }, [comments])

   if (load) { return <Loader/>; }

  return (
    <div className={styles.container}>
      {comments.map((comment) => (
         <div className={styles.comment} key={comment._id}>
      
            <div className={styles.topBetween}>
               <div className={styles.profile}>
                  <img src={comment.user.profilePic} alt="Profile Picture" />
                  <p className={styles.username}>{comment.user.username}</p>
               </div>
               <p className={styles.date}>{comment.createdAt}</p>
            </div>

            <div className={styles.content}>{comment.message}</div>

       
            <div className={styles.btnActions}>
               <BtnItem action={() => handlePost(comment._id)} icon={faReply} text="Post a reply" className='bg-yellow-500' />
               <BtnItem action={() => handleEdit(comment._id)} icon={faEdit} text="Edit comment" className='bg-blue-500' />
               <BtnItem action={() => handleDelete(comment._id)} icon={faTrash} text="Delete comment" className='bg-red-600' />
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
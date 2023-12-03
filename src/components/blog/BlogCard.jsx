import React from 'react';
import Link from 'next/link';
import styles from './blog.module.css';

const BlogCard = ({ blog, mutate, authenticatedUser }) => {

   const { parentMessage, sneaker, replies } = blog;

   // Limit the number of copper images to 7
   const limitedCoppers = sneaker.coppers.slice(0, 6);
   const remainingCopperCount = sneaker.coppers.length - limitedCoppers.length;


  return (
    <div className={styles.blogContainer}>

         <div className={styles.headerContainer}>
            <img src={authenticatedUser.profilePic || '/default.png'} alt="User Profile" className={styles.userProfilePic} />
            <p className={styles.userName}>{authenticatedUser.username}</p>
            <p className={styles.blogDate}>{new Date(parentMessage.createdAt).toLocaleString()}</p>
         </div>

         <div className={styles.commentContainer}>{parentMessage.message}</div>

         {replies.map((reply) => (
         <div className={styles.replyContainer} key={reply._id}>
            <div className={styles.justifyBetween}>
               <div className={styles.replierName}>
                  <img className={styles.replierLogo} src={reply.user.profilePic} alt="Profile Pic" />
                  <strong>{reply.user.username}</strong>
               </div>
               <div className={styles.createdAt}>{new Date(reply.createdAt).toLocaleString()}</div>
            </div>
            <p className={styles.replyContent}>{reply.message}</p>
         </div>
         ))}
      
         <div className={styles.sneakerContainer}>
            <Link href={`/sneakers/${sneaker._id}`}>
               <img src={sneaker.img} alt="Sneaker" className={styles.sneakerImage} />
            </Link>
            <div className={styles.coppersContainer}>
               {limitedCoppers.map((copper) => (
                  <img key={copper._id} src={copper.profilePic || '/default.png'} alt="Copper Profile" className={styles.copperProfilePic} />
               ))}
               {remainingCopperCount > 0 && (
                  <div className={styles.moreCopperPlaceholder}>
                     <p>+{remainingCopperCount}</p>
                  </div>
               )}
            </div>
         </div>

    </div>
  )
}

export default BlogCard
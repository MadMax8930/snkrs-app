import React from 'react';
import styles from './blog.module.css';

const BlogCard = ({ blog, mutate, authenticatedUser }) => {

   const { message, parentMessage, sneaker, createdAt } = blog;

   // Limit the number of copper images to 7
   const limitedCoppers = sneaker.coppers.slice(0, 6);
   const remainingCopperCount = sneaker.coppers.length - limitedCoppers.length;


  return (
    <div className={styles.blogContainer}>

         <div className={styles.blogHeader}>
            <img src={authenticatedUser.profilePic || '/default.png'} alt="User Profile" className={styles.userProfilePic} />
            <p>{authenticatedUser.username}</p>
            <p className={styles.blogDate}>{new Date(createdAt).toLocaleString()}</p>
         </div>
         <div className={styles.blogContent}><p>{message}</p></div>

         {parentMessage && (
            <div className={styles.replyContainer}>
               <span className={styles.replyToUser}>Replied to: <strong>{parentMessage.user.username}</strong></span>
               <p className={styles.replyToComm}>{parentMessage.message}</p>
            </div>
         )}

         <div className={styles.sneakerContainer}>
            <img src={sneaker.img} alt="Sneaker" className={styles.sneakerImage} />
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
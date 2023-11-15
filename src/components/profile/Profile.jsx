"use client";
import axios from '../../../axios.config';
import React, { useContext, useState } from 'react';
import { UserContext } from '@/context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faUpload } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import styles from './profile.module.css';

const Profile = () => {
   const { user, setUser } = useContext(UserContext);
   const [pictureState, setPictureState] = useState('');
   const [loading, setLoading] = useState(false);

   const updateProfilePic = async () => {
      try {
         setLoading(true);
         const res = await axios.put('/profile/picture', { profilePic: pictureState }, { withCredentials: true });
         const updatedUser = res.data;
         setUser(updatedUser);
      } catch (error) {
         console.error("Error updating profile picture:", error);
         toast.error("Please make sure the URL is valid.");
      } finally {
         setLoading(false);
         setPictureState('')
      }
   }
  
  return (
    <div className={styles.container}>
      
         <img src={user.profilePic || '/default.png'} alt="Profile Pic" 
            width={50} height={50} onError={(e) => e.target.src = '/default.png'} />
     
      <div className={styles.profileContainer}>
         
         <div className={styles.userInfoSection}>
            <div className='flex items-center gap-1 leading-4'>
               <p className='text-base md:text-lg font-bold capitalize'>{user.username}</p>
               <p className='text-xs md:text-base text-zinc-600 underline'>{user.email}</p>
            </div>
         </div>

         <div className={styles.userInputSection}>
            <div className={styles.groupInputAndBtn}> 
               <input
                  type="text"
                  placeholder="New Profile Picture URL"
                  value={pictureState}
                  onChange={(e) => setPictureState(e.target.value)}
               />
               <button onClick={updateProfilePic} disabled={loading}>
                  {loading
                     ? <FontAwesomeIcon icon={faSpinner} size="sm" />
                     : <FontAwesomeIcon icon={faUpload} size="sm" /> 
                  }
               </button>
            </div>
         </div>
      </div>
    </div>
  )
}

export default Profile
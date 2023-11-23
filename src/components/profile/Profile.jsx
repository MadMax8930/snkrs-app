"use client";
import axios from '../../../axios.config';
import React, { useContext, useState } from 'react';
import { UserContext } from '@/context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTextWidth, faUpload } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import styles from './profile.module.css';

const Profile = () => {
   const { user, setUser } = useContext(UserContext);
   const [pictureState, setPictureState] = useState('');
   const [showInput, setShowInput] = useState(false);
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

   const handleShowInput = () => {
      setShowInput((prev) => !prev)
   }
  
  return (
    <div className={styles.container}>
      <img className={styles.gifAbsolute} src="/color.gif" alt="Sneaker Gif" />

      <p className={styles.nameDisplay}>{user.username}</p>

      <div className={styles.imageSection}>
         <img src={user.profilePic || '/default.png'} alt="Profile Pic" 
            onError={(e) => e.target.src = '/default.png'} />
      </div>

      <div className={styles.inputSection}>
         <button onClick={handleShowInput} className={styles.leftBtn}>    
            <FontAwesomeIcon icon={faTextWidth} size="sm" />
         </button>
            {showInput
               ?  
               <>
                  <input
                     type="text"
                     placeholder="New Profile Picture URL"
                     value={pictureState}
                     onChange={(e) => setPictureState(e.target.value)} />
                  <button onClick={updateProfilePic} disabled={loading} className={styles.rightBtn}>
                     {loading
                        ? <FontAwesomeIcon icon={faSpinner} size="sm" />
                        : <FontAwesomeIcon icon={faUpload} size="sm" /> 
                     }
                  </button>
               </>
               :
               <button disabled={true} className={styles.rightBtn}>
                  <FontAwesomeIcon icon={faUpload} size="sm" /> 
               </button> 
            }
      </div>

    </div>
  )
}

export default Profile
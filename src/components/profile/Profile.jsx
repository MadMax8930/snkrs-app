"use client";
import axios from '../../../axios.config';
import React, { useContext, useState } from 'react';
import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import styles from './profile.module.css';

const Profile = () => {
   const router = useRouter();
   const { user, setUser, clearUser } = useContext(UserContext);
   const handleLogout = () => { clearUser(() => { router.push('/auth?variant=login') }) };

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
      <div className={styles.profileContainer}>
         <div className={styles.userInfo}>
            <h2>Authenticated as: {user.username}</h2>
            <p>User ID: {user._id}</p>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Logout</button>
         </div>

         <div className={styles.userPic}>
            <input
               type="text"
               placeholder="New Profile Picture URL"
               value={pictureState}
               onChange={(e) => setPictureState(e.target.value)}
            />
            <button onClick={updateProfilePic} disabled={loading}>
               {loading ? 'Updating...' : 'Update Picture'}
            </button>
            <img 
               src={user.profilePic || '/default.png'} alt="Profile Pic" 
               width={50} height={50} onError={(e) => e.target.src = '/default.png'} />
         </div>
      </div>
      <div className={styles.notificationContainer}>
         {user.notifications.map((notif, index) => (
            <p key={index}>{notif}</p>)
         )}
      </div>
    </div>
  )
}

export default Profile
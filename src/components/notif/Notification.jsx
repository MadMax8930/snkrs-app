"use client";
import axios from '../../../axios.config';
import React, { useEffect } from 'react';
import useNotificationsForSneaker from '@/hooks/useNotificationsForSneaker';
import { toast } from 'react-hot-toast';
import styles from './notification.module.css';

const Notification = ({ sneakerId }) => {
   const { data: notifications, mutate: mutateNotifications } = useNotificationsForSneaker(sneakerId)

   useEffect(() => {
      console.log("user notif:", { notifications });
    }, [notifications]);
  
   const scheduleAlreadySelectedForASneaker = (schedule) =>
      notifications?.some((notif) => notif.schedule === schedule);
  
   const handleCheckboxChange = async (schedule) => {
      try {
         await axios.post('/profile/add-notification', { sneakerId, schedule }, { withCredentials: true });
         toast.success('Notification added successfully');
         // Trigger a re-fetch of the data for the specific key
         mutateNotifications();
      } catch (error) {
         console.error('Error adding notification:', error);
         toast.error('Notification can not be added');
      };
   };

  return (
    <div className={styles.notification}>
      Notification page:
      <label>
        <input 
          type="checkbox" 
          checked={scheduleAlreadySelectedForASneaker('1 day before')}
          onChange={() => handleCheckboxChange('1 day before')}
        />
        1 Day
      </label>
      <label>
        <input
          type="checkbox"
          checked={scheduleAlreadySelectedForASneaker('3 days before')}
          onChange={() => handleCheckboxChange('3 days before')}
        />
        3 Days
      </label>
      <label>
        <input
          type="checkbox"
          checked={scheduleAlreadySelectedForASneaker('1 week before')}
          onChange={() => handleCheckboxChange('1 week before')}
        />
        1 Week
      </label>
    </div>
  )
}

export default Notification
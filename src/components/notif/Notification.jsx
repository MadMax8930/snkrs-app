"use client";
import axios from '../../../axios.config';
import React, { useState } from 'react';
import useNotificationsForSneaker from '@/hooks/useNotificationsForSneaker';
import { toast } from 'react-hot-toast';
import styles from './notification.module.css';

const Notification = ({ sneakerId }) => {
   const { data: notifications, mutate: mutateNotifications } = useNotificationsForSneaker(sneakerId)
   const [loading, setLoading] = useState(false);
   
   const getNotificationId = (schedule) => {
      const existingNotification = notifications?.find((notif) => notif.schedule === schedule);
      return existingNotification ? existingNotification._id : null;
   };
  
   const handleAddCheckbox = async (schedule) => {
      try {
         setLoading(true);
         await axios.post('/api/profile/add-notification', { sneakerId, schedule }, { withCredentials: true });
         toast.success('Notification added successfully');
         // Trigger a re-fetch data
         mutateNotifications();
      } catch (error) {
         console.error('Error adding notification:', error);
         toast.error('Sorry! Please try again.');
      } finally {
         setLoading(false);
      }
   };

   const handleRemoveCheckbox = async (notificationId) => {
      try {
         setLoading(true);
         await axios.delete(`/api/profile/notifications/${notificationId}`, { withCredentials: true });
         toast.success('Notification removed successfully');
         // Trigger a re-fetch data
         mutateNotifications();
      } catch (error) {
         console.error('Error removing notification:', error);
         toast.error('Sorry! Please try again.');
      } finally {
         setLoading(false);
      }
   };

   const handleCheckboxToggle = async (schedule) => {
      const notificationId = getNotificationId(schedule);

      if (notificationId) {
         // Checkbox is checked
         await handleRemoveCheckbox(notificationId);
      } else {
         // Checkbox is unchecked
         await handleAddCheckbox(schedule);
      }
   };
   
   if (loading) { return <p className='pt-2 lg:text-base md:text-sm text-xs text-gray-600'>Loading...</p>; }

  return (
    <div className={styles.container}>
      <label>
        <input 
          type="checkbox" 
          checked={Boolean(getNotificationId('1 day before'))}
          onChange={() => handleCheckboxToggle('1 day before')}
        />
        1 Day
      </label>
      <label>
        <input
          type="checkbox"
          checked={Boolean(getNotificationId('3 days before'))}
          onChange={() => handleCheckboxToggle('3 days before')}
        />
        3 Days
      </label>
      <label>
        <input
          type="checkbox"
          checked={Boolean(getNotificationId('1 week before'))}
          onChange={() => handleCheckboxToggle('1 week before')}
        />
        1 Week
      </label>
    </div>
  )
}

export default Notification
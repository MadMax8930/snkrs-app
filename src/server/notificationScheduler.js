const axios = require('axios');
const cron = require('node-cron');
const notificationsController = require('../controllers/notifications');
const sendNotification = require('./notificationSender');
require('dotenv').config();

const baseURL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_CONNECTION_TO_BACKEND: 'http://localhost:3001';
const headers = { 'dev-api-key': process.env.AUTHORIZED_DEV };

const isItTimeToNotify = (timestamp) => {
   const currTimeUTC = new Date();
   const currTimeParis = currTimeUTC.setHours(currTimeUTC.getHours() + 1);
   const targetTime = new Date(timestamp);
   const range = 1 * 60 * 1000;
   return Math.abs(currTimeParis - targetTime) <= range;
}

const startCronJob = async () => {
  cron.schedule('0 0 * * *', async () => {
      try {
        console.log('Notification scheduler cron job has started.');

        const response = await axios.get(`${baseURL}/api/cron-all-notifications`, { headers });
        const notifications = response.data;

        if (notifications && notifications.length > 0) {
            for (const notification of notifications) {
               const { _id: notificationId, user, content, schedule, sneaker, timestamp } = notification;

               try {
                  if (user && user.email && isItTimeToNotify(timestamp)) {
                     await sendNotification(user.email, sneaker, schedule, content);
                     await notificationsController.clearNotificationByIdForCronJob({ params: { notificationId } });
                  }
               } catch (notificationError) {
                  console.error('Error processing notification:', notificationError);
               } 
            };
          console.log('Notification scheduler cron job completed.');
        } else {
          console.log('No notifications found. Putting cron job on standby for 12 hours.');
          await new Promise(resolve => setTimeout(resolve, 12 * 60 * 60 * 1000));
        }
      } catch (error) {
         console.error('Notification scheduler cron job has failed:', error);
      }
  });
}

module.exports = { startCronJob };
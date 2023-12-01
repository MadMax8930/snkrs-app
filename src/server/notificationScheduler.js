const axios = require('axios');
const cron = require('node-cron');
const notificationsController = require('../controllers/notifications');
const sendNotification = require('./notificationSender');
require('dotenv').config();

const isItTimeToNotify = (timestamp) => {
   const currTime = new Date();
   return currTime.getTime() === new Date(timestamp).getTime();
}

const baseURL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_CONNECTION_TO_BACKEND: 'http://localhost:3001';
const headers = { 'dev-api-key': process.env.AUTHORIZED_DEV };
 
const startCronJob = async () => {
  cron.schedule('0 */8 * * *', async () => {
      try {
        console.log('Notification scheduler cron job has started.');

        const response = await axios.get(`${baseURL}/api/cron-all-notifications`, { headers });
        const notifications = response.data;

        if (notifications && notifications.length > 0) {

            for (const notification of notifications) {
               const { _id: notificationId, user: { email: userEmail }, content, schedule, sneaker, timestamp } = notification;

               if (isItTimeToNotify(timestamp)) {
                  await sendNotification(userEmail, sneaker, schedule, content);
                  await notificationsController.clearNotificationByIdForCronJob({ params: { notificationId } });
               }
            };
         
          console.log('Notification scheduler cron job completed.');
        } else {
          console.log('No notifications found. Putting cron job on standby for 2 hours.');
          await new Promise(resolve => setTimeout(resolve, 2 * 60 * 60 * 1000));
        }
      } catch (error) {
         console.error('Notification scheduler cron job has failed:', error);
      }
  });
}

module.exports = { startCronJob };
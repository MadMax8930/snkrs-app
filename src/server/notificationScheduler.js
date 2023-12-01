const cron = require('node-cron');
const sendNotification = require('./notificationSender');
const notificationsController = require('../controllers/notifications');

const isItTimeToNotify = (timestamp) => {
   const currTime = new Date();
   return currTime.getTime() === new Date(timestamp).getTime();;
}
 
const startCronJob = () => {
  cron.schedule('0 */8 * * *', async () => {
      try {
         const { userEmail, notifications } = notificationsController.getAllNotificationsForUser;

         for (const notification of notifications) {
            const { content, schedule, sneakerId, timestamp } = notification;

            if (isItTimeToNotify(timestamp)) {
               await sendNotification(userEmail, sneakerId, schedule, content);
            }
         };

         console.log('Notification scheduler cron job completed.');
      } catch (error) {
         console.error('Notification scheduler cron job failed:', error);
      }
  });
}

module.exports = { startCronJob };
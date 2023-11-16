const cron = require('node-cron');
const sendNotification = require('./notificationSender');
const notificationsController = require('../controllers/notifications');

const isItTimeToNotify = (timestamp) => {
   const currTime = new Date();
   return currTime.getTime() === new Date(timestamp).getTime();;
}
 
const startCronJob = () => {
  cron.schedule('* * * * *', async () => {
      try {
         console.log('Running notification scheduler cron job...');

         const pendingNotifications = notificationsController.getAllNotificationsForUser;
         // Process each pending notification
         for (const notification of pendingNotifications) {
            const { userId, content, schedule, sneakerId, timestamp } = notification;

            if (isItTimeToNotify(timestamp)) {
               await sendNotification(userId, sneakerId, schedule, content);
            }
         };

         console.log('Notification scheduler cron job completed.');
      } catch (error) {
         console.error('Error in notification scheduler cron job:', error);
      }
  });
}

module.exports = { startCronJob };
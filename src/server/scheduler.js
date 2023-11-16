const cron = require('node-cron');
const sendNotification = require('./sender');
const notificationsController = require('../controllers/notifications');

const isItTimeToNotify = (timestamp) => {
   const currTime = new Date();
   return currTime.getTime() === new Date(timestamp).getTime();;
}
 
const startCronJob = () => {
  cron.schedule('* * * * *', async () => {
      try {
         console.log('Running notification scheduler cron job...');

         // Get pending notifications from the database
         const pendingNotifications = await notificationsController.getAllNotificationsForUser;

         // Process each pending notification
         for (const notification of pendingNotifications) {
            const { userId, content, schedule, sneakerId, timestamp } = notification;

            if (isItTimeToNotify(timestamp)) {
               await sendNotification(userId, sneakerId, schedule, content);

               // Remove the notification from the user's list (if the time of it is in the past)
               // await notificationsController.removeNotificationForUser
            }
         };

         console.log('Notification scheduler cron job completed.');
      } catch (error) {
         console.error('Error in notification scheduler cron job:', error);
      }
  });
}

module.exports = { startCronJob };
const cron = require('node-cron');
const Notification = require('../models/Notification');
const notificationsController = require('../controllers/notifications');

function isItTimeToNotify(schedule) {
   // Logic to check if the current time matches the notification schedule
}
 
async function sendNotification(userId, sneakerId, content) {
  // Logic to send the notification to user
  console.log(`Sending notification to user ${userId} with ${email} for ${sneakerId} - ${content}`);
}

const startCronJob = () => {
  cron.schedule('* * * * *', async () => {
      try {
         console.log('Running notification scheduler cron job...');

         // Get pending notifications from the database
         const pendingNotifications = await notificationsController.getPendingNotifications();

         // Process each pending notification
         for (const notification of pendingNotifications) {
            const { userId, content, schedule } = notification;

            if (isItTimeToNotify(schedule)) {
               // Send the notification to the user
               await sendNotification(userId, 'Sneaker Notification', content);

               // Remove the notification from the user's list (if the time of it is in the past)
               await notificationsController.removeNotification(notification._id);
            }
         };

         console.log('Notification scheduler cron job completed.');
      } catch (error) {
         console.error('Error in notification scheduler cron job:', error);
      }
  });
}

module.exports = { startCronJob };
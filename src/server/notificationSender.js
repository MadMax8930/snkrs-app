// const notificationsController = require('../controllers/notifications');

const sendNotification = async (userId, sneakerId, schedule, content) => {
   try {
     // TODO Set up an Email Service Provider
     console.log(`Sending notification to user ${userId} for sneaker ${sneakerId} (${schedule}): ${content}`);
     // Remove the sent notification from the user's list
     // await notificationsController.removeNotificationForUser
   } catch (error) {
     console.error('Error sending notification:', error);
   }
};
 
module.exports = sendNotification;
 
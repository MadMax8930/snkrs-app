const sendNotification = async (userId, sneakerId, schedule, content) => {
   try {
     // TODO Set up an Email Service Provider API
     console.log(`Sending notification to user ${userId} for sneaker ${sneakerId} (${schedule}): ${content}`);
   } catch (error) {
     console.error('Error sending notification:', error);
   }
};
 
module.exports = sendNotification;
 
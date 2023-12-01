const nodemailer = require('nodemailer');
const notificationsController = require('../controllers/notifications');
require('dotenv').config();

const sendNotification = async (userEmail, sneakerId, schedule, content) => {
   try {
     // Email client (nodemailer) communicates with Simple Mail Transport Protocol server
     const transporter = nodemailer.createTransport({
         host: 'gmail',
         auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS, //"app password" generated specifically for tHIS app to auth with Gmail's SMTP serveR
         },
     });

     const mailOptions = {
         from: 'MaxSneakers <madmax8930@gmail.com>',
         to: userEmail,
         subject: `Sneaker Notification - ${schedule}`,
         text: content,
     };

     await transporter.sendMail(mailOptions);
     console.log(`Email sent to user ${userEmail} for sneaker ${sneakerId} (${schedule}): ${content}`);

     // Remove the sent notification from the user's list
     // await notificationsController.removeNotificationForUser
   } catch (error) {
     console.error('Error sending notification:', error);
   }
};
 
module.exports = sendNotification;
 
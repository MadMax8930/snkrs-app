const nodemailer = require('nodemailer');
require('dotenv').config();

// Authenticate Gmail SMTP server using an app-specific password
const sendNotification = async (userEmail, sneakerId, schedule, content) => {
   try {
     const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
         },
     });

     const mailOptions = {
         from: `MaxSneakers <${process.env.ADMIN_CONTACT}>`,
         to: userEmail,
         subject: `Notification reminder - ${schedule} the official release`,
         text: content,
     };

     await transporter.sendMail(mailOptions);
     console.log(`Email sent to user ${userEmail} for sneaker ${sneakerId} (${schedule}): ${content}`);
   } catch (error) {
     console.error('Error sending notification:', error);
   }
};
 
module.exports = sendNotification;
 
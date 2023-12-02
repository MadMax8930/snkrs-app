const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const { startCronJob } = require('./notificationScheduler');
const { customMiddleware } = require('../middlewares');
app.use(customMiddleware);

const requireAuth = require('../middlewares/requireAuth'); 
const authorizeDev = require('../middlewares/authorizeDev');
const authController = require('../controllers/auth');
const usersController = require('../controllers/users')
const sneakersController = require('../controllers/sneakers');
const commentsController = require('../controllers/comments');
const notificationsController = require('../controllers/notifications');

/* AUTH */
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.get('/api/profile', requireAuth, usersController.getUserProfile);
app.put('/api/profile/picture', requireAuth, usersController.uploadPicture);

/* SNKRS */
app.get('/api/sneakers', sneakersController.getPublicSneakers);
app.get('/api/sneakers/:sneakerId', sneakersController.getPublicSneakerById);
app.get('/api/profile/sneakers', requireAuth, sneakersController.getUserSneakers);
app.get('/api/profile/sneakers/:sneakerId', requireAuth, sneakersController.getUserSneakerById);
app.get('/api/profile/sneakers-copped', requireAuth, sneakersController.getCoppedSneakers);
app.patch('/api/profile/sneakers/:sneakerId/toggle', requireAuth, sneakersController.toggleCopping)
app.get('/api/sneakers-filter', sneakersController.filterSneakers);
app.get('/api/profile/sneakers-filter', requireAuth, sneakersController.filterUserSneakers);

/* COMMENTS */
app.get('/api/sneakers/:sneakerId/comments', commentsController.getAllCommentsForSneaker);
app.get('/api/sneakers/:sneakerId/comments/:commentId', commentsController.getCommentByIdForSneaker);
app.get('/api/profile/sneakers-comments', requireAuth, commentsController.getAllUserCommentsForBlogs);
app.get('/api/profile/sneakers/:sneakerId/comments/:commentId', requireAuth, commentsController.getUserComment);
app.post('/api/profile/sneakers/:sneakerId/comments', requireAuth, commentsController.addUserComment);
app.put('/api/profile/sneakers/:sneakerId/comments/:commentId', requireAuth, commentsController.updateUserComment);
app.delete('/api/profile/sneakers/:sneakerId/comments/:commentId', requireAuth, commentsController.deleteUserComment);

/* NOTIFICATIONS */
app.get('/api/profile/notifications', requireAuth, notificationsController.getAllNotificationsForUser);
app.get('/api/profile/notifications/:notificationId', requireAuth, notificationsController.getOneNotificationForUser);
app.get('/api/profile/notifications/sneakers/:sneakerId', requireAuth, notificationsController.getAllNotificationsForUserPerSneaker);
app.post('/api/profile/add-notification', requireAuth, notificationsController.createNotificationForUser);
app.delete('/api/profile/notifications/:notificationId', requireAuth, notificationsController.removeNotificationForUser);

/* ADMIN HELPERS */
app.get('/api/users', authorizeDev, usersController.getAllUsers);
app.get('/api/users/:userId', authorizeDev, usersController.getUserById);
app.post('/api/sneakers/add-scrapers', authorizeDev, sneakersController.add10ScrapedSneakers);
app.get('/api/cron-all-notifications', authorizeDev, notificationsController.getAllNotificationsForCronJob);
app.delete('/api/cron-notification/:notificationId', authorizeDev, notificationsController.clearNotificationByIdForCronJob);
app.delete('/api/profile/sneakers/:sneakerId/delete-comments', authorizeDev, requireAuth, commentsController.deleteAllUserCommentsForSneaker);
app.delete('/api/profile/remove-notifications/:sneakerId', authorizeDev, requireAuth, notificationsController.removeAllNotificationsForUserPerSneaker);
app.delete('/api/profile/remove-notifications-for-all-sneakers', authorizeDev, requireAuth, notificationsController.removeAllNotificationsForUserForAllSneakers);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => { 
   console.log('Connected to MongoDB database');
   startCronJob();
});

app.listen(port, () => {
  console.log(`Express server has started and is running on port ${port}`);
});

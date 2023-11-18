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
app.post('/login', authController.login);
app.post('/register', authController.register);
app.get('/profile', requireAuth, usersController.getUserProfile);
app.put('/profile/picture', requireAuth, usersController.uploadPicture);

/* SNKRS */
app.get('/sneakers', sneakersController.getPublicSneakers);
app.get('/sneakers/:sneakerId', sneakersController.getPublicSneakerById);
app.get('/profile/sneakers', requireAuth, sneakersController.getUserSneakers);
app.get('/profile/sneakers/:sneakerId', requireAuth, sneakersController.getUserSneakerById);
app.get('/profile/sneakers-copped', requireAuth, sneakersController.getCoppedSneakers);
app.patch('/profile/sneakers/:sneakerId/toggle', requireAuth, sneakersController.toggleCopping)
app.get('/sneakers-filter', sneakersController.filterSneakers);
app.get('/profile/sneakers-filter', requireAuth, sneakersController.filterUserSneakers);

/* COMMENTS */
app.get('/sneakers/:sneakerId/comments', commentsController.getAllCommentsForSneaker);
app.get('/profile/sneakers-comments', requireAuth, commentsController.getAllUserComments);
app.get('/profile/sneakers/:sneakerId/comments/:commentId', requireAuth, commentsController.getUserComment);
app.post('/profile/sneakers/:sneakerId/comment', requireAuth, commentsController.addUserComment);
app.put('/profile/sneakers/:sneakerId/comments/:commentId', requireAuth, commentsController.updateUserComment);
app.delete('/profile/sneakers/:sneakerId/comments/:commentId', requireAuth, commentsController.deleteUserComment);

/* NOTIFICATIONS */
app.get('/profile/notifications', requireAuth, notificationsController.getAllNotificationsForUser);
app.get('/profile/notifications/:notificationId', requireAuth, notificationsController.getOneNotificationForUser);
app.get('/profile/notifications/sneakers/:sneakerId', requireAuth, notificationsController.getAllNotificationsForUserPerSneaker);
app.post('/profile/add-notification', requireAuth, notificationsController.createNotificationForUser);
app.delete('/profile/notifications/:notificationId', requireAuth, notificationsController.removeNotificationForUser);

/* ADMIN HELPERS */
app.get('/users', authorizeDev, usersController.getAllUsers);
app.get('/users/:userId', authorizeDev, usersController.getUserById);
app.delete('/profile/remove-notifications/:sneakerId', authorizeDev, requireAuth, notificationsController.removeAllNotificationsForUserPerSneaker);
app.delete('/profile/remove-notifications-for-all-sneakers', authorizeDev, requireAuth, notificationsController.removeAllNotificationsForUserForAllSneakers);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => { 
   console.log('Connected to MongoDB database');
   // startCronJob();
});

app.listen(port, () => {
  console.log(`Express server has started and is running on port ${port}`);
});

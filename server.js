const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const { customMiddleware } = require('./src/middlewares'); 
app.use(customMiddleware);

const requireAuth = require('./src/middlewares/requireAuth'); 
const authorizeDev = require('./src/middlewares/authorizeDev');
const authController = require('./src/controllers/auth');
const usersController = require('./src/controllers/users')
const sneakersController = require('./src/controllers/sneakers');
const commentsController = require('./src/controllers/comments');
const notificationsController = require('./src/controllers/notifications');

/* done */
app.post('/login', authController.login);
app.post('/register', authController.register);

/* done */
app.get('/users', authorizeDev, usersController.getAllUsers);
app.get('/users/:userId', authorizeDev, usersController.getUserById);
app.put('/profile/users', requireAuth, usersController.uploadPicture);

/* done */
app.get('/sneakers', sneakersController.getPublicSneakers);
app.get('/profile/sneakers', requireAuth, sneakersController.getUserSneakers);
app.get('/profile/sneakers/:sneakerId', requireAuth, sneakersController.getUserSneakerById);
app.get('/profile/sneakers-copped', requireAuth, sneakersController.getCoppedSneakers);
app.patch('/profile/sneakers/:sneakerId/toggle', requireAuth, sneakersController.toggleCopping)
app.get('/sneakers/filter', sneakersController.filterSneakers);

/* done */
app.get('/sneakers/:sneakerId/comments', commentsController.getAllCommentsForSneaker);
app.get('/profile/sneakers', requireAuth, commentsController.getUserComments);
app.post('/profile/sneakers/:sneakerId/comment', requireAuth, commentsController.addUserComment);
app.put('/profile/sneakers/:sneakerId/comments/:commentId', requireAuth, commentsController.updateUserComment);
app.delete('/profile/sneakers/:sneakerId/comments/:commentId', requireAuth, commentsController.deleteUserComment);

/* todo */
app.get('/users/:userId/notifications', requireAuth, notificationsController.getAllNotificationsForUser);
app.post('/users/:userId/notification', requireAuth, notificationsController.createNotificationForUser);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => { console.log('Connected to MongoDB database'); });

app.listen(port, () => {
  console.log(`Express server has started and is running on port ${port}`);
});

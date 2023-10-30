const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const logRequest = (req, res, next) => {
   console.log(`Received ${req.method} request for ${req.originalUrl}.`);
   next(); // Call next() to pass the request to the next middleware
};

const logResponse = (req, res, next) => {
   const oldJson = res.json;
   res.json = function (body) {
     console.log('Response JSON:', body);
     oldJson.call(this, body);
   };
   next();
};
 
app.use(logRequest);
app.use(logResponse);

const authController = require('./src/controllers/auth');
const usersController = require('./src/controllers/users')
const sneakersController = require('./src/controllers/sneakers');
const commentsController = require('./src/controllers/comments');
const notificationsController = require('./src/controllers/notifications');

app.post('/login', authController.loginUser);
app.post('/register', authController.registerUser);

app.get('/users', usersController.getAllUsers);
app.get('/users/:userId', usersController.getUserById);
app.put('/users/:userId/profile', usersController.uploadProfilePicture);

app.get('/sneakers', sneakersController.getAllSneakers);
app.get('/sneakers/:sneakerId', sneakersController.getSneakerById);
app.get('/sneakers/filter', sneakersController.filterSneakers);
app.patch('/sneakers/:sneakerId/toggle', sneakersController.toggleCopping)

app.get('/sneakers/:sneakerId/comments', commentsController.getAllCommentsForSneaker);
app.post('/sneakers/:sneakerId/comment', commentsController.addCommentForSneaker);

app.get('/users/:userId/notifications', notificationsController.getAllNotificationsForUser);
app.post('/users/:userId/notification', notificationsController.createNotificationForUser);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once('open', () => { console.log('Connected to MongoDB database'); });

app.listen(port, () => {
  console.log(`Express server has started and is running on port ${port}`);
});

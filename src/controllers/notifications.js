const User = require('../models/User');
const Sneaker = require('../models/Sneaker');
const Notification = require('../models/Notification');
 
const getAllNotificationsForUser = async (req, res) => {
   try {
     const userId = req.user._id;

     const notifications = await Notification.find({ user: userId });   
     if (!notifications) { return res.status(200).json([]); }      

     return res.status(200).json(notifications);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const getAllNotificationsForUserPerSneaker = async (req, res) => {
   const { sneakerId } = req.params;

   try {
     const userId = req.user._id;

     const user = await User.findById(userId).populate('notifications');
     if (!user) { return res.status(404).json({ error: 'User not found' }); }
     
     const sneaker = await Sneaker.findById(sneakerId);
     if (!sneaker) { return res.status(404).json({ error: 'Sneaker not found' }); }

     const userNotificationsForSneaker = user.notifications.filter((item) => item.sneaker.toString() === sneakerId);                          
     return res.status(200).json(userNotificationsForSneaker);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const getOneNotificationForUser = async (req, res) => {
   const { notificationId } = req.params;

   try {
     const userId = req.user._id;

     const notification = await Notification.findById({ _id: notificationId, user: userId });
     if (!notification) { return res.status(404).json({ error: 'Notification not found' }); }                           
     return res.status(200).json(notification);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const createNotificationForUser = async (req, res) => {
   const { sneakerId, schedule } = req.body;

   try {
     const userId = req.user._id;
   
     const user = await User.findById(userId).populate('notifications');
     const sneaker = await Sneaker.findById(sneakerId);
     if (!user || !sneaker) { return res.status(404).json({ error: 'User or Sneaker not found' }); }
  
     // Check if the user is a "copper" for the sneaker
     if (!sneaker.coppers.includes(userId)) { 
       return res.status(400).json({ error: 'You can only create notifications for sneakers you are copping' });
     }

     // Check if user has a notification with the same schedule
     const existingNotification = user.notifications.find(
         (notification) => notification.schedule === schedule && notification.sneaker.toString() === sneakerId
      );
     if (existingNotification) { return res.status(400).json({ error: 'Notification with the same schedule already exists' }); }

     // Create a new notification, if there is no existing schedule
     let timestamp;
     const sneakerDate = new Date(sneaker.dateRelease); 

     if (schedule === '1 day before') {
       timestamp = new Date(sneakerDate - 24 * 60 * 60 * 1000);
     } else if (schedule === '3 days before') {
       timestamp = new Date(sneakerDate - 3 * 24 * 60 * 60 * 1000);
     } else if (schedule === '1 week before') {
       timestamp = new Date(sneakerDate  - 7 * 24 * 60 * 60 * 1000);
     } else {
       return res.status(400).json({ error: 'Invalid schedule' });
     }

     const newNotification = new Notification({ 
         user, 
         sneaker, 
         schedule, 
         content: `Yay! The sneaker that you are planning to cop - ${sneaker.name} ${sneaker.model} - will be available in ${schedule.split(' before')} Good luck to you ${user.username}! [Notification alert]`, 
         timestamp 
     });
     await newNotification.save();

     user.notifications.push(newNotification);
     await user.save();

         const responseNotification = {
            _id: newNotification._id,
            content: newNotification.content,
            schedule: newNotification.schedule,
            sneaker: sneaker._id,
            user: {
              _id: user._id,
              username: user.username,
              profilePic: user.profilePic,
            },
            timestamp: newNotification.timestamp,
         };
 
     return res.status(201).json(responseNotification);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const removeNotificationForUser = async (req, res) => {
   const { notificationId } = req.params;
   
   try {
     const userId = req.user._id;

     // Find the user and check if the notification belongs to the user
     const user = await User.findById(userId).populate('notifications');
     if (!user) { return res.status(404).json({ error: 'User not found' }); }

     // Find the notification by ID
     const notification = user.notifications.find((item) => item._id.toString() === notificationId);
     if (!notification) { return res.status(404).json({ error: 'Notification not found' }); }

     // Remove the notification from the user's notifications array
     user.notifications = user.notifications.filter((item) => item._id.toString() !== notificationId);
     await user.save();

     // Delete the notification from the Notification model
     await Notification.findByIdAndRemove(notificationId);
     return res.status(200).json({ message: 'Notification removed successfully' });
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const removeAllNotificationsForUserPerSneaker = async (req, res) => {
   const { sneakerId } = req.params;
 
   try {
     const userId = req.user._id;

     const user = await User.findById(userId).populate('notifications');
     if (!user) { return res.status(404).json({ error: 'User not found' }); }

     const sneaker = await Sneaker.findById(sneakerId);
     if (!sneaker) { return res.status(404).json({ error: 'Sneaker not found' }); }
 
     // Filter notifications based on the provided sneakerId
     const notificationsArray = user.notifications.filter((item) => item.sneaker.toString() === sneakerId);
 
     // Remove the notifications and update the user's notifications array
     for (const notification of notificationsArray) { 
        const removedNotification = await Notification.findByIdAndRemove(notification._id);
        if (!removedNotification) { return res.status(404).json({ error: 'Notification not found' }); }
        user.notifications = user.notifications.filter((item) => item._id.toString() !== notification._id.toString());
     }
 
     await user.save();
     return res.status(200).json({ message: 'Notifications removed successfully' });
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const removeAllNotificationsForUserForAllSneakers  = async (req, res) => {
   try {
     const userId = req.user._id;
 
     const user = await User.findById(userId).populate('notifications');
     if (!user) { return res.status(404).json({ error: 'User not found' }); }
 
     const notificationIds = user.notifications.map((notification) => notification._id);
     user.notifications = [];

     await Notification.deleteMany({ _id: { $in: notificationIds } });
 
     await user.save();
     return res.status(200).json({ message: 'All notifications removed successfully' });
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};
 

module.exports = { getAllNotificationsForUser, getAllNotificationsForUserPerSneaker, getOneNotificationForUser, createNotificationForUser, removeNotificationForUser, removeAllNotificationsForUserPerSneaker, removeAllNotificationsForUserForAllSneakers };
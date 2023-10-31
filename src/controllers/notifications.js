const User = require('../models/User');
const Sneaker = require('../models/Sneaker');
const Notification = require('../models/Notification');
 
const getAllNotificationsForUser = async (req, res) => {
   try {
     const notifications = await Notification.find({ user: req.params.userId })
                                             .populate('user')
                                             .populate('sneaker')
                                             .exec();
     return res.status(200).json(notifications);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const createNotificationForUser = async (req, res) => {
   const { sneakerId, schedule, content } = req.body;
   const { userId } = req.params;

   try {
     const user = await User.findById(userId);
     const sneaker = await Sneaker.findById(sneakerId);
     if (!user || !sneaker) { return res.status(404).json({ error: 'User or Sneaker not found' }); }

     let timestamp;
     if (schedule === '1 day before') {
       timestamp = new Date(sneaker.dateRelease - 24 * 60 * 60 * 1000);
     } else if (schedule === '3 days before') {
       timestamp = new Date(sneaker.dateRelease - 3 * 24 * 60 * 60 * 1000);
     } else if (schedule === '1 week before') {
       timestamp = new Date(sneaker.dateRelease - 7 * 24 * 60 * 60 * 1000);
     } else {
       return res.status(400).json({ error: 'Invalid schedule' });
     }

     const newNotification = new Notification({ user, sneaker, schedule, content, timestamp });
     await newNotification.save();
 
     return res.status(201).json(newNotification);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

module.exports = { getAllNotificationsForUser, createNotificationForUser };
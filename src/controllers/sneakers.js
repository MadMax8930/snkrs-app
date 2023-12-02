const User = require('../models/User');
const Sneaker = require('../models/Sneaker');
const Notification = require('../models/Notification');
const saveToDatabase = require('../web/saveDB');

const getPublicSneakers = async (req, res) => {
   try {
     const sneakers = await Sneaker.find({}, '-coppers -comments -__v').sort({ dateRelease: 1 });
     sneakers.forEach(sneaker => sneaker.copping = false);
     return res.status(200).json(sneakers);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const getPublicSneakerById = async (req, res) => {
   const { sneakerId } = req.params;

   try {
     const sneaker = await Sneaker.findById(sneakerId, '-comments -__v');
     if (sneaker) {
       sneaker.copping = false;
       return res.status(200).json(sneaker);
     } else {
       return res.status(404).json({ error: 'Sneaker not found' });
     }
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const getUserSneakers = async (req, res) => {
   try {
     const sneakers = await Sneaker.find({}, '-comments -__v').sort({ dateRelease: 1 });
     sneakers.forEach((sneaker) => sneaker.copping = sneaker.coppers.includes(req.user._id));
     return res.status(200).json(sneakers);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const getUserSneakerById = async (req, res) => {
   const { sneakerId } = req.params;

   try {
     const sneaker = await Sneaker.findById(sneakerId, '-__v');
     if (sneaker) {
       sneaker.copping = sneaker.coppers.includes(req.user._id);
       return res.status(200).json(sneaker);
     } else {
       return res.status(404).json({ error: 'Sneaker not found' });
     }
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const getCoppedSneakers = async (req, res) => {
   try {
     const userId = req.user._id;
     const sneakers = await Sneaker.find({ copping: true, coppers: userId });
     return res.status(200).json(sneakers);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const toggleCopping = async (req, res) => {
   const { sneakerId } = req.params;

   try { 
     // Ensure that the request is coming from the owner of the sneaker
     if (!req.user) { return res.status(403).json({ error: 'Forbidden: You cannot do this operation' }); }

     const userId = req.user._id;
     const sneaker = await Sneaker.findById(sneakerId, '-__v');
     if (!sneaker) { return res.status(404).json({ error: 'Sneaker not found' }); }

     if (sneaker.copping === true && sneaker.coppers.includes(userId)) {
         if (sneaker.coppers.indexOf(userId) !== -1) { sneaker.coppers.splice(sneaker.coppers.indexOf(userId), 1); }

         // Clear the notifications array for this user and sneaker
         const user = await User.findById(userId);
            if (user) {
               // Get notification IDs associated with the specified sneakerId
               const allNotifications = await Notification.find({ user: userId });
               const notificationIdsToRemove = allNotifications
                  .filter((item) => item.sneaker.toString() === sneakerId)
                  .map((item) => item._id.toString());
                  
               // Filter out the notification IDs to remove from the user's notifications array
               user.notifications = user.notifications.filter((item) => !notificationIdsToRemove.includes(item.toString()));
               await user.save();
            }
         
         // Clear the Notifications document for this user and sneaker
         await Notification.deleteMany({ user: userId, sneaker: sneakerId });
         
         sneaker.copping = false;
     } else {
         if (sneaker.coppers.indexOf(userId) === -1) { sneaker.coppers.push(userId); }

         sneaker.copping = true;
     }

     const updatedSneaker = await sneaker.save();
     return res.status(200).json(updatedSneaker);   
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const filterSneakers = async (req, res) => {
   const { brand, resellIndex, dateRelease } = req.query;
   
   try {
     const filter = {};
     // Add filters if provided
     if (brand) { filter.brand = brand; }
     if (resellIndex) { filter.resellIndex = resellIndex; }
     if (dateRelease) { filter.dateRelease = dateRelease; }

     const sneakers = await Sneaker.find(filter, '-coppers -comments -__v').sort({ dateRelease: 1 });
     sneakers.forEach(sneaker => sneaker.copping = false);
     if (sneakers.length === 0) { return res.status(200).json([]); }
     return res.status(200).json(sneakers);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const filterUserSneakers = async (req, res) => {
   const { brand, resellIndex, dateRelease } = req.query;
   
   try {
     const filter = {};
     // Add filters if provided
     if (brand) { filter.brand = brand; }
     if (resellIndex) { filter.resellIndex = resellIndex; }
     if (dateRelease) { filter.dateRelease = dateRelease; }

     const sneakers = await Sneaker.find(filter, '-comments -__v').sort({ dateRelease: 1 });
     sneakers.forEach(sneaker => sneaker.copping = sneaker.coppers.includes(req.user._id));
     if (sneakers.length === 0) { return res.status(200).json([]); }
     return res.status(200).json(sneakers);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const add10ScrapedSneakers = async (req, res) => {
   try {
     await saveToDatabase();
     res.status(200).send('Sneakers saved to the database successfully.');
   } catch (error) {
     console.error('Error saving sneakers to the database:', error);
     res.status(500).send('Internal server error');
   }
};
  
module.exports = { getPublicSneakers, getPublicSneakerById, getUserSneakers, getUserSneakerById, getCoppedSneakers, toggleCopping, filterSneakers, filterUserSneakers, add10ScrapedSneakers };
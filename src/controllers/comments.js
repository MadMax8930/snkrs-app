const User = require('../models/User');
const Sneaker = require('../models/Sneaker');
const Comment = require('../models/Comment');
 
const getAllCommentsForSneaker = async (req, res) => {
   try {
     const comments = await Comment.find({ sneaker: req.params.sneakerId })
                                   .populate('user')
                                   .populate('sneaker')
                                   .exec();
     return res.status(200).json(comments);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const addCommentForSneaker = async (req, res) => {
   const { userId, message } = req.body;
   const { sneakerId } = req.params;

   try {
     const user = await User.findById(userId);
     const sneaker = await Sneaker.findById(sneakerId);
     if (!user || !sneaker) { return res.status(404).json({ error: 'User or Sneaker not found' }); }

     const newComment = new Comment({ user, sneaker, message });
     await newComment.save();

     return res.status(201).json(newComment);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

module.exports = { getAllCommentsForSneaker, addCommentForSneaker };
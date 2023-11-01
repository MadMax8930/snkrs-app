const User = require('../models/User');
const Sneaker = require('../models/Sneaker');
const Comment = require('../models/Comment');
 
const getAllCommentsForSneaker = async (req, res) => {
   try {
     const comments = await Comment.find({ sneaker: req.params.sneakerId })
                                    .populate({ path: 'user', select: 'username profilePic' })
     return res.status(200).json(comments);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const getUserCommentsForSneaker = async (req, res) => {
   try {
     const allSneakers = await Sneaker.find();
 
     // Find the user's comments for each sneaker
     const comments = await Comment.find({ user: req.user._id, sneaker: { $in: allSneakers.map(sneaker => sneaker._id) } });
 
     // Organize data for each sneaker
     const sneakersWithComments = allSneakers.map(sneaker => {
       const userComments = comments.filter(comment => comment.sneaker.equals(sneaker._id));
       return {
         sneaker,
         userComments,
       };
     });
 
     return res.status(200).json(sneakersWithComments);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const addUserComment = async (req, res) => {
   const { message } = req.body;
   const { sneakerId } = req.params;

   try {
     const user = req.user;  // requireAuth middleware
     const newComment = new Comment({ user, message });
     await newComment.save();

     const sneaker = await Sneaker.findById(sneakerId);
     if (!sneaker) { return res.status(404).json({ error: 'Sneaker not found' }); }
     sneaker.comments.push(newComment);
     await sneaker.save();

         const responseComment = {
            _id: newComment._id,
            message: newComment.message,
            parentMessage: newComment.parentMessage,
            sneaker: sneaker._id,
            user: {
              _id: user._id,
              username: user.username,
              profilePic: user.profilePic,
            },
            createdAt: newComment.createdAt,
         };

     return res.status(201).json(responseComment);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const updateUserComment = async (req, res) => {
   const { message } = req.body;
   const { commentId, sneakerId } = req.params;
 
   try {
     const comment = await Comment.findOne({ _id: commentId, sneaker: sneakerId, user: req.user._id });
     if (!comment) { return res.status(404).json({ error: 'Comment not found or does not belong to the specified sneaker.' }); }
     if (!comment.user.equals(req.user._id)) { return res.status(403).json({ error: 'Forbidden: You cannot update this comment as it does not belong to you.' }); }

     comment.message = message;
     await comment.save();
 
     return res.status(200).json({ message: 'Comment updated successfully', comment });
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const deleteUserComment = async (req, res) => {
   const { commentId, sneakerId } = req.params;
 
   try {
     const comment = await Comment.findOne({ _id: commentId, sneaker: sneakerId, user: req.user._id });
     if (!comment) { return res.status(404).json({ error: 'Comment not found or does not belong to the specified sneaker.' }); }
     if (!comment.user.equals(req.user._id)) { return res.status(403).json({ error: 'Forbidden: You cannot delete this comment' }); }
 
     // Delete the comment and its replies
     await Comment.deleteMany({ $or: [{ _id: commentId, user: req.user._id }, { parentMessage: commentId }] });
 
     return res.status(200).json({ message: 'Comment deleted successfully' });
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};
 
module.exports = { getAllCommentsForSneaker, addUserComment, getUserCommentsForSneaker, updateUserComment, deleteUserComment };
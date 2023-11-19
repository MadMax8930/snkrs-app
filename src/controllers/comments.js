const Sneaker = require('../models/Sneaker');
const Comment = require('../models/Comment');
 
const getAllCommentsForSneaker = async (req, res) => {
   const { sneakerId } = req.params;

   try {
     const comments = await Comment.find({ sneaker: sneakerId }).populate({ path: 'user', select: 'username profilePic' });
     return res.status(200).json(comments);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const getAllUserComments = async (req, res) => {
   try {
     const userId = req.user._id;

     const comments = await Comment.find({ user: userId, sneaker: { $exists: true } })
     return res.status(200).json(comments);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const getUserComment = async (req, res) => {
   const { commentId, sneakerId } = req.params;
 
   try {
     const comment = await Comment.findOne({ _id: commentId, sneaker: sneakerId, user: req.user._id });
     if (!comment) { return res.status(404).json({ error: 'Comment not found.' }); }
     return res.status(200).json(comment);
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

const addUserComment = async (req, res) => {
   const { message, parentMessageId } = req.body;
   const { sneakerId } = req.params;

   try {
     const user = req.user;  // requireAuth middleware
     const parentMessage = parentMessageId ? await Comment.findById(parentMessageId) : null;

     const sneaker = await Sneaker.findById(sneakerId);
     if (!sneaker) { return res.status(404).json({ error: 'Sneaker not found' }); }

     const newComment = new Comment({ user, message, parentMessage, sneaker: sneaker._id });
     await newComment.save();

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

const deleteAllUserCommentsForSneaker = async (req, res) => {
   const { sneakerId } = req.params;
 
   try {
     await Comment.deleteMany({ sneaker: sneakerId, user: req.user._id });
     return res.status(200).json({ message: 'All user comments for the specified sneaker deleted successfully' });
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};
 
module.exports = { getAllCommentsForSneaker, getAllUserComments, getUserComment, addUserComment, updateUserComment, deleteUserComment, deleteAllUserCommentsForSneaker };
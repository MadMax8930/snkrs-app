const User = require('../models/User');
const validator = require('validator');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) { return res.status(404).json({ error: 'User not found' }); }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserProfile = async (req, res) => {   
  try {
    const user = await User.findById(req.user._id).select('-password -__v');
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const uploadPicture = async (req, res) => {
  const { profilePic } = req.body;

  if (!validator.isURL(profilePic, { protocols: ['http', 'https'] })) {
    return res.status(400).json({ error: 'Invalid profile picture URL' });
  }
   
  try {
    req.user.profilePic = profilePic;
    const updatedUser = await req.user.save();
    const userResponse = await User.findById(updatedUser._id).select('-password -notifications -__v');
    return res.status(200).json(userResponse);
  } catch (error) {
    console.error('Error updating profile picture:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllUsers, getUserById, getUserProfile, uploadPicture };
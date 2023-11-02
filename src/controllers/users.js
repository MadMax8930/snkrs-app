const User = require('../models/User');

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

const uploadPicture = async (req, res) => {
  const { profilePic } = req.body;
  
  try {
    req.user.profilePic = profilePic;
    const updatedUser = await req.user.save();
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllUsers, getUserById, uploadPicture };
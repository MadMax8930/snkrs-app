const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
   try {
     const { username, email, password } = req.body;

     const existingUser = await User.findOne({ email });
     if (existingUser) { return res.status(400).json({ error: 'User already exists' }); }

     // Hash password and create new user
     const hashedPassword = await bcrypt.hash(password, 10);
     const user = new User({ username, email, password: hashedPassword });
     await user.save();

     return res.status(201).json({ message: 'User registered successfully', user });
  }  catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
   try {
     const { email, password } = req.body;

     const registeredUser = await User.findOne({ email });
     if (!registeredUser) { return res.status(401).json({ error: 'Invalid credentials' }); }

     // Compare the provided password with the stored hash
     const passwordMatch = await bcrypt.compare(password, registeredUser.password);
     if (!passwordMatch) { return res.status(401).json({ error: 'Invalid credentials' }); }

     // Create a JWT token
     const token = jwt.sign({ userId: registeredUser._id, email: registeredUser.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
     return res.status(200).json({ message: `Logged in successfully as ${registeredUser.username}`, token, registeredUser });
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error' });
   }
};

module.exports = { register, login };
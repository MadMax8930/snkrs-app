const User = require('../models/User');
const jwt = require('jsonwebtoken');

const requireAuth = async (req, res, next) => {
   try {
     const token = req.cookies['token'] // Get JWT token from HTTP cookie
     if (!token) { return res.status(401).json({ error: 'Unauthorized: Missing token' }); }

     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
     if (!decodedToken) { return res.status(401).json({ error: 'Unauthorized: Invalid token' }); }

     const userExists = await User.findById(decodedToken.userId);
     if (!userExists) { return res.status(401).json({ error: 'Unauthorized: User not found' }); }
  
     req.user = userExists;  // Attach the user object to the request for further handling

     next();
   } catch (error) {
     return res.status(500).json({ error: 'Internal Server Error (User not logged in)' });
   }
};

module.exports = requireAuth;
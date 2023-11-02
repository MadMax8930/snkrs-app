const authorizeDev = (req, res, next) => {
   const apiKey = req.headers['dev-api-key'];

   if (apiKey === process.env.AUTHORIZED_DEV) {
     req.userType = 'developer';
     next();
   } else {
     req.userType = 'regular';
     return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
   }
};

module.exports = authorizeDev;
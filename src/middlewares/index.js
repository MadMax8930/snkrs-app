const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const logIncomingRequest = (req, res, next) => {
   console.log(`Received ${req.method} request for ${req.originalUrl}.`);
   next();
};

const logServerResponse = (req, res, next) => {
   const oldJson = res.json;
   res.json = function (body) {
     console.log('Response JSON:', body);
     oldJson.call(this, body);
   };
   next();
};

const setHeaderContentType = (req, res, next) => {
   res.setHeader('Content-Type', 'application/json');
   next();
};

const corsOptions = {
   credentials: true,
   origin: process.env.NODE_ENV === 'production'
     ? process.env.EXPRESS_CONNECTION_TO_FRONTEND
     : 'http://localhost:3000',
   optionsSuccessStatus: 204,
};

const corsMiddleware = cors(corsOptions);
 
const customMiddleware = [
   corsMiddleware,
   cookieParser(),
   express.json(),
   logIncomingRequest, 
   logServerResponse, 
   setHeaderContentType,
];

module.exports = { customMiddleware };
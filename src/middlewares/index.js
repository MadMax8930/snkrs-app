const express = require('express');

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

const customMiddleware = [express.json(), logIncomingRequest, logServerResponse, setHeaderContentType];

module.exports = { customMiddleware };
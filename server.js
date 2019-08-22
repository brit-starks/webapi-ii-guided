const express = require('express');
// in this server file, we "require" our router
// files, which each export an express.router() object.
// These objects are used to "bind" a root URL to all
// of the middleware and endpoint handlers in the 
// router file. See below.
const hubsRouter = require('./hubs/hubs-router.js');
const messagesRouter = require('./messages/messages-router.js');

const server = express();

server.use(express.json());
server.use('/api/hubs', hubsRouter);
server.use('/api/messages', messagesRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});


module.exports = server;

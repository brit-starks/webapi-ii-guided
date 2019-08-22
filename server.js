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

//
// these server.use() statements "bind" our router objects
// to the specified root url's. This means that express()
// will look in the corresponding router object for 
// middleware/handlers for HTTP requests on URL's that begin
// with the specified URL root.
//
// so, GET /api/hubs/ will be handled by the GET "/" handler
// in the hubsRouter object, because the hubsRouter object
// is bound to /api/hubs. Likewise, DELETE /api/hubs/:id
// will cause express() to look in the hubsRouter for a handler
// for DELETE /:id.
//
server.use('/api/hubs', hubsRouter);
server.use('/api/messages', messagesRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});


// 
// be sure to export our server!
//
module.exports = server;

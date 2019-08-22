const express = require('express');
const Hubs = require('./hubs-model.js');

//
// when we create a router file, we just create
// a router object from express.Router(), and then 
// call the .METHOD() methods on the router object,
// similar to how we did it with the express.server() 
// object before.
//
// the middleware/handlers that we create on the 
// router object are useless unless we "bind" the
// router to some root URL. This happens with an 
// express.server().use() call. By specifying a root
// url in the .use() call, and passing in the router
// object, the router object is then bound to that
// "root" url, and any HTTP request that begins with
// that root url will be handled by matching middleware
// in the rouer object.
//
// THE MAIN REASON we do this is to keep our code clean,
// concise, and well-organized, which aids in expansion /
// adding new features, troubleshooting / debugging, and
// collaborating with other cosmonauts.
//
const router = express.Router();


router.get('/', async (req, res) => {
    try {
      const hubs = await Hubs.find(req.query);
      res.status(200).json(hubs);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hubs',
      });
    }
  });

  
  
  
  router.get('/:id', async (req, res) => {
    try {
      const hub = await Hubs.findById(req.params.id);
  
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'Hub not found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hub',
      });
    }
  });
  
  router.post('/', async (req, res) => {
    try {
      const hub = await Hubs.add(req.body);
      res.status(201).json(hub);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the hub',
      });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const count = await Hubs.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'The hub has been nuked' });
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    }
  });
  
  router.put('/:id', async (req, res) => {
    try {
      const hub = await Hubs.update(req.params.id, req.body);
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the hub',
      });
    }
  });

  // get messages for a hub... supply the hub id in the url
router.get('/:id/messages', async (req, res) => {
    try {
        // call findHubMessages, pass the id
        const messages = await Hubs.findHubMessages(req.params.id);

        if (messages) {
            res.status(200).json(messages);
        } else {
            res.status(404).json({success:false, message:'the hub cannot be found'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message: error});
    }
});

// add a message to a hub
router.post('/:id/messages', async (req, res) => {

    //
    // the following syntax uses the "rest operator" : "..."
    // this is NOT related to "REST" api's.
    // the "rest" operator in JavaScript basically says, "copy  
    // everything from this other object" (in this case, req.body).
    //
    // this will copy all of the json fields in the POST body.
    // After copying all existing fields and values, 
    // the syntax then overrides the "hub_id" property of the 
    // json body in the POST with the req.params.id (from the url).
    //
    // Or, if there isn't a hub_id, it creates it and adds the id.
    //
    // This is needed because the Hubs.addMessage() method takes
    // a json object that specifies, the "from" text, the "text"
    // text, *and* the ID of the hub to save the message to.
    //
    const messageInfo = { ...req.body, hub_id: req.params.id };

    try {
        const message = await Hubs.addMessage(messageInfo);
        res.status(201).json(message);
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:error});
    }
});


//
// if we don't export our router object,
// it would not be possible for the server module
// to "requires" it. (I sound like Popeye...)
//
module.exports = router;



//
// see hubs-router.js for some riveting reading about 
// router objects and modules, cosmonauts, and Popeye.
//

const express = require('express');
const Hubs = require('../hubs/hubs-model.js');

const router = express.Router();


router.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);

    try  {
        const message = await Hubs.findMessageById(id);
        console.log(message);
        if (message) {
            res.status(200).json(message);
        } else {
            res.status(404).json({success:false, message:'invalid message id'});
        }
    } catch (err) {
        res.status(500).json({success:false, message:err});
    }
});


module.exports = router;


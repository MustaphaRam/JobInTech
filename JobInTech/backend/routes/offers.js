const express = require('express');
const offer = require('../controllers/offerController');

const router = express.Router();

// Define a route
router.get('/api/offers', offer.getAllOffers);
router.get('/api/myoffers/:id', offer.getMyOffers);
router.post('/api/addOffer', offer.addOffer);
router.get('/api/offer/:id', offer.getOffer);


// export the router module so that server.js file can use it
module.exports = router;
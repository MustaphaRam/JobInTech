// routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const recruiterController = require('../controllers/recruiterController');
const experienceController = require('../controllers/experienceController');
const educationController = require('../controllers/educationController');
const { saveCandidatePro, getCandidateById} = require('../controllers/candidateController');
const { check, validationResult } = require('express-validator');
const upload = require('../controllers/savefiles')

router.get('/', (request, response) => {
  response.send('Hello JOBINTECH Board!');
});



/*** Candidate routes */

// User routes
router.get('/users/:id', userController.getUserById);

// get candidate
router.get('/api/candidate/:id', getCandidateById);
router.post('/api/candidate/:id',upload.single('cv'), saveCandidatePro);

// Recruiter routes
router.get('/api/recruiter/:id', recruiterController.getRecruiterById);
router.post('/api/recruiter/:id', upload.single('logo'), recruiterController.addRecruiter);
router.put('/api/recruiter/:id', recruiterController.updateRecruiter);

// Experience routes
router.get('/api/experiences/:id', experienceController.getExperienceById);

// Education routes
router.get('/api/educations/:id', educationController.getEducationById);

// Offers routes

const offer = require('../controllers/offerController');

router.get('/api/offers', offer.getAllOffers);
router.get('/api/myoffers/:id', offer.getMyOffers);
router.post('/api/offer', offer.addOffer);
router.get('/api/offer/:id', offer.getOffer);
router.put('/api/offer/:id', offer.updateOffer);
router.delete('/api/offer/:id', offer.deleteOffer);

module.exports = router;

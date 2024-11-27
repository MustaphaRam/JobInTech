// routes/users.js
const express = require('express');
const {
    getRecruiterById, addPro, updatePro, deletePro
  } = require ("../controllers/recruiterController");
  

const router = express.Router();

// Candidate routes
/* router.get('/api/candidate/:id', getCandidateById);

router.post('/api/candidate/:id/save', saveCandidatePro); */

// Recruiter routes
router.get('/api/recruiter/:id', getRecruiterById);
router.post('/api/recruiter/:id', addPro);


// export the router module so that server.js file can use it
module.exports = router;

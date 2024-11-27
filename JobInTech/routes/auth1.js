const express = require('express');
const { signup, login, logout } = require('../controllers/authController');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// register
router.post('/api/auth/signup', [
    check('username').isLength({min:3, max:20}).withMessage('Invalid username'),
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6, max: 30 }).withMessage('Password must be between 6 and 20 characters'),
    check('role').isIn(['candidate', 'recruiter']).withMessage('select type user'),
    ], signup
);

// login 
router.post("/api/auth/login", [
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6, max: 30 }).withMessage('Password must be between 6 and 20 characters')
    ], login
);

// logout
router.post("/api/auth/logout", logout);


module.exports = router;

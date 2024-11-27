// routes.js
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtSecret = '603cc438888dc900ffb89d85906a4cacd28ec6e52c1d0efa5da8ec43816ca9731ddb1a233fd564894b0767040b0c1f4883913e878e6496f63408a0f7c7617c22';
const router = express.Router();
const User = require('../Models/User');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

/* router.get('/login', (req, res) => {
    res.render('login'); // Renders views/login.ejs
});

router.get('/signup', (req, res) => {
    res.render('signup'); // Renders views/signup.ejs
}); */

// Logout route
router.get('/api/auth/logout', (req, res) => {
  req.logout(); // Passport function to clear the session and remove the user object
  res.redirect('/login'); // Redirect to login page after logout
});

/* router.post('/api/auth/login', passport.authenticate('local', { session: false }), (req, res, info) => {
    const token = jwt.sign({ sub: req.user._id }, jwtSecret);
    //res.json({ token });
    
    res.status(200).json({
        message: "login succes",
        user: "",
        token: token,
    });
    //res.cookie("access_token", token, { httpOnly: true } ).status(200).json();
}); */


router.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Perform authentication logic (e.g., querying the database)
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            // User not found, return error response
            return res.status(400).json({ message: 'email or password Incorrect' });
        }

        // check passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // Passwords don't match, return error response
            return res.status(400).json({ message: 'email or password Incorrect' });
        }

        // Authentication successful, proceed with login
        // Set user session or generate JWT token, etc.
        req.session.user = user;

        // Return success response
        res.json({ message: 'Login successful', user });
    } catch (error) {
        // Handle any unexpected errors
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/api/auth/signup', [
    check('username').isLength({min:3, max:20}).withMessage('Invalid username'),
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6, max: 30 }).withMessage('Password must be between 6 and 30 characters'),
    check('role').isIn(['candidate', 'recruiter']).withMessage('select type user name'),
    ], async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password, role } = req.body;
        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.status(409).json("User already exists!");
        }

        const hashedPassword = await bcrypt.hash(password, 15);
        const user = new User({ username, email, password: hashedPassword, role });
        await user.save();
        // res.json(user);
        res.status(200).json("user save success");
        //res.redirect('/profile');
    } catch (err) {
        next(err);
    }
});

module.exports = router;

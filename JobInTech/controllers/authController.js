const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { check, validationResult } = require('express-validator');
const Recruiter = require('../Models/Recruiter');
const Candidate = require('../Models/Candidate');

// register
const signup = async (req, res, next) => {

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

        if(user.role === "recruiter") {
            const recruiter = new Recruiter({ user: user.id });
            recruiter.save();
        } else if(user.role === "recruiter") {
            const candidate = new Candidate({ user: user.id });
            candidate.save();
        }
        // res.json(user);
        //res.status(200).json("user save success");
        //res.redirect('/profile');
        const token = jwt.sign({ id: user.id }, "jwtkey");
        //const { password, ...other } = user;

        // Create user object to send in response without the password
        const userToSend = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        };

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(userToSend);

    } catch (err) {
        next(err);
    }
}

// login
const login = async (req, res) => {

    // check req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;

    try {
        // Perform authentication logic (e.g., querying the database)
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            // User not found, return error response
            return res.status(400).json({ msg: 'email or password Incorrect' });
        }

        // check passwords
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            // Passwords don't match, return error response
            return res.status(400).json({ msg: 'email or password Incorrect' });
        }
        
        // auth old
        /* // Authentication successful, proceed with login
        // Set user session or generate JWT token, etc.
        req.session.user = user;

        // Return success response
        res.json(user); */
        
        const token = jwt.sign({ id: user.id }, "jwtkey");
        //const { password, ...other } = user;

        // Create user object to send in response without the password
        const userToSend = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt
        };

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(userToSend);
        
    } catch (error) {
        // Handle any unexpected errors
        console.error('Login error:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

// Route for handling logout
const logout = (req, res) => {
    /* try {
        console.log("logout")
        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
                console.error('Logout error:', err);
                return res.status(500).json({ message: 'Logout failed' });
            }
            res.clearCookie('access_token', {
                sameSite:"none",
                secure:true
            }).status(200).json("User has been logout");
        });
    } catch (error) {
        // Handle any unexpected errors
        console.error('Logout error:', error);
        res.status(500).json({ message: 'Internal server error' });
    } */

    res.clearCookie("access_token", {
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out")

}

module.exports = {signup, login, logout};

// userController.js
const User = require('../Models/User');

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        next(err);
    }
};


// Find user by email
const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user; // Returns null if user not found
    } catch (error) {
        throw error;
    }
};

module.exports = {findUserByEmail, getUserById };

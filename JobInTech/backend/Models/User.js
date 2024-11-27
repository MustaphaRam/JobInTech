const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, max: 20 },
    email: { type: String, required: true, unique: true, max: 40},
    password: { type: String, required: true, min: 6, max: 30},
    role: { type: String, enum: ['candidate', 'recruiter'], default: 'candidate', required: true },
    // Other user profile fields like name, skills, company details, etc.
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;

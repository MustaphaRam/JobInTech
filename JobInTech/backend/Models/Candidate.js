const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const candidateSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, min: 3, max: 30 },
    lastName: { type: String, required: true, min: 3, max: 30 },
    phone: { type: String, min: 8, max: 15 },
    gender: { type: String, enum: ['male', 'female'], default: 'male' },
    date_birth: { type: Date },
    address: { type: String, max: 50 },
    state: { type: String, max: 50 },
    cv: { type: String }, // Assuming cv is stored as a file path or URL
    portfolioLinks: { type: String, max: 200 }
}, { timestamps: true });

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;

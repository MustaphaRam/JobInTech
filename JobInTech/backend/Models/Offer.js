const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    recruiter: { type: Schema.Types.ObjectId, ref: 'Recruiter' },
    title: { type: String },
    description: { type: String},
    profile: { type: String },
    position: { type: String },
    job_type: { type: String},
    skillsRequired: [{ type: String }], // Array of skills required
    status: { type: String, enum: ['active', 'closed', 'expired'], default: 'active' }, // Status field with default value
    salaire: {type: String},
}, { timestamps: true });

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;

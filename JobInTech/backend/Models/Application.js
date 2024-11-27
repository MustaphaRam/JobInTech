const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    candidate: { type: Schema.Types.ObjectId, ref: 'Candidate', required: true },
    offer: { type: Schema.Types.ObjectId, ref: 'Offer', required: true },
    date_application: { type: Date, default: Date.now },
    status: { type: String }, // Pending, Accepted, Rejected, etc.
    feedback: { type: String }
}, { timestamps: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;

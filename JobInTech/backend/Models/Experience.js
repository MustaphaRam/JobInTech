const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExperienceSchema = new Schema({
    candidate: { type: Schema.Types.ObjectId, ref: 'Candidate' },
    jobTitle: { type: String },
    company: { type: String },
    description: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
}, { timestamps: true });

const Experience = mongoose.model('Experience', ExperienceSchema);
module.exports = Experience;
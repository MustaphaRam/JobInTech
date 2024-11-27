const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recruiterSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    companyName: { type: String },
    address: { type: String },
    phone : { type: String },
    logo: { type: String },
    industry: { type: String }, // Additional field for industry
    companySize: { type: String }, // Additional field for company size
    website: { type: String }, // Additional field for website URL
    city: { type: String },
    state: { type: String }
}, { timestamps: true });

const Recruiter = mongoose.model('Recruiter', recruiterSchema);

module.exports = Recruiter;

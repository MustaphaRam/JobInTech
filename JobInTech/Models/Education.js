const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationSchema = new Schema({
    candidate: { type: Schema.Types.ObjectId, ref: 'Candidate' },
    certificat: { type: String },
    degree: { type: String},
    institution: { type: String},
    fieldOfStudy: { type: String },
    graduationYear: { type: Number }
}, { timestamps: true });

const Education = mongoose.model('Education', educationSchema);
module.exports = Education;

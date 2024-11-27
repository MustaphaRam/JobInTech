const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
    candidate: { type: Schema.Types.ObjectId, ref: 'Candidate', required: true },
    skill: { type: String, required: true },
    level: { type: Number} // Assuming level is represented as a number
}, { timestamps: true });

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;

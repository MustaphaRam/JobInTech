// experienceController.js
const Experience = require('../Models/Experience');

exports.getExperienceById = async (req, res, next) => {
    try {
        const experience = await Experience.findById(req.params.id);
        res.json(experience);
    } catch (err) {
        next(err);
    }
};

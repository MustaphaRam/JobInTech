const Education = require('../Models/Education');

exports.getEducationById = async (req, res, next) => {
    try {
        const education = await Education.findById(req.params.id);
        res.json(education);
    } catch (err) {
        next(err);
    }
};

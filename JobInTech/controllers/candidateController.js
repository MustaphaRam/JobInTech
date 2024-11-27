// candidateController.js
const { response } = require('express');
const User = require('../Models/User');
const Candidate = require('../Models/Candidate');
const Experience = require('../Models/Experience');
const Education = require('../Models/Education');
const Skill = require('../Models/Skill');
const { check, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');


const getCandidateById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        
        if(user) {
            const candidate = await Candidate.findOne({user : user._id});
            
            if (candidate) {
                const education = await Education.find({ candidate : candidate._id });
                const experience = await Experience.find({ candidate : candidate._id });
                const skill = await Skill.findOne({ candidate : candidate._id }) || [];

                //const { name, lastName, date_birth, gender, phone, address, city, state, portfolioLinks, cv} = candidate
                //res.json({name, lastName, date_birth, gender, phone, address, city, state, portfolioLinks, cv, education, experience, skill});
                //res.json(candidate);
            
                res.status(200).json({candidate,education,experience,skill});
            } else {
                res.status(404).json({ message: 'Candidate not found' });
            }
        } else {
            res.status(404).json('Not found')
        }
    } catch (err) {
        next(err);
    }
};


// save candidate profile
const saveCandidatePro = async (req, res, next) => {

    const cvFilePath = req.file ? req.file.path : '';
    const educations = req.body.education || [];
    const experiences = req.body.experience || [];
    try {
        const { name, lastName, date_birth, gender, phone, address, city, state, portfolioLinks, } = req.body;
        const user = await User.findById(req.params.id);
        console.log(req.body);
        if (user) {
            const candidate = await Candidate.findOne({ user: req.params.id });

            // check if user have candidate
            if (!candidate) {
                const candidate = new Candidate({ user: user.id , name, lastName, date_birth, gender, phone, address, city, state, portfolioLinks, cv: cvFilePath || '' });
                await candidate.save();
            } else {
                // if not have update candidate
                if(cvFilePath) {
                    console.log(candidate.cv)
                    if(candidate.cv) {
                        const filePath = path.join(__dirname,'..', '', candidate.cv);
                        fs.unlinkSync(filePath); // Synchronously delete the file
                    }
                }
                await candidate.updateOne({name, lastName, date_birth, gender, phone, address, city, state, portfolioLinks, cv: cvFilePath || ''});
            }

            // save skills
            if(req.body.skill) {
                const skill = await Skill.findOne({ candidate: candidate.id });
                if(!skill) {
                    const skill = new Skill({candidate: candidate.id, skill: req.body.skill})
                    await skill.save();
                } else {
                    Skill.updateOne({candidate: candidate.id, skill: req.body.skill});
                }
            }
            
            // save Edications
            if (educations.length > 0) {
                // Delete all documents from the Education collection
                const result = await Education.deleteMany({ candidate: candidate._id });
                for (const edu of educations) {
                    if (edu.certificat) {
                        const education = new Education({
                            candidate: candidate.id,
                            certificat: edu.certificat,
                            degree: edu.degree,
                            institution: edu.institution,
                            fieldOfStudy: edu.fieldOfStudy,
                            graduationYear: edu.graduationYear
                        });
                        // Save the education object
                        await education.save();
                        console.log("save education object: "+education.id);
                    }
                }
            }

            // save Experiences
            if (experiences.length > 0) {
                const result = await Experience.deleteMany({ candidate: candidate._id });
                for (const experienceData of experiences) {
                    if (experienceData.jobTitle) {
                        const experience = new Experience({
                            candidate: candidate.id,
                            jobTitle: experienceData.jobTitle,
                            company: experienceData.company,
                            startDate: experienceData.startDate,
                            endDate: experienceData.startDate,
                            description: experienceData.description
                        });
                        // Save the experince object
                        await experience.save();
                    }
                }
            }
        }
        res.status(200).json("save succes");

    } catch (err) {
        //next(err);
        res.status(400).json('Failed to save candidate \n'+ err.message);
        console.error(err)
    }
}

module.exports = {saveCandidatePro, getCandidateById};

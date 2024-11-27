const { body } = require('express-validator');
const Recruiter = require('../Models/Recruiter');
const User = require('../Models/User');
const busboy = require('busboy');
const fs = require('fs');
const path = require('path');

const getRecruiterById = async (req, res, next) => {
    try {
        const recruiter = await Recruiter.findOne({ user: req.params.id});
        if (!recruiter) {
            return res.status(404).json({ message: 'Recruiter not found' });
        }
        res.json(recruiter);
    } catch (err) {
        next(err);
    }
};

const addRecruiter = async (req, res, next) => {
    try {
        const logoFilePath = req.file ? req.file.path : '';
        const {companyName, address, phone, industry, companySize, website, city, state} = req.body;
        //console.log(req.file);
        //const parser = new busboy({ headers: req.headers });
        const user = await User.findById(req.params.id);
        //console.log(req.body);

        if (user) {
            const recruiter = await Recruiter.findOne({ user: req.params.id });

            // check if user have candidate
            if (!recruiter) {
                const recruiter = new Recruiter({ user: user.id , companyName, address, phone, industry, companySize, website, city, state, logo: logoFilePath || '' });
                await recruiter.save();
            } else {
                // if not have update candidate
                if(logoFilePath && recruiter.logo) {
                    try {
                        const filePath = path.join(__dirname,'..', '', recruiter.logo);
                        console.log("path: "+filePath);
                        fs.unlinkSync(filePath); // Synchronously delete the file
                    } catch(err){
                        console.log(err.message);
                    }
                }
                await recruiter.updateOne({companyName, address, phone, industry, companySize, website, city, state, logo: logoFilePath || ''});
            }
        }
        res.status(200).json("save succes");

    } catch (err) {
        //next(err);
        res.status(400).json('Failed to save candidate \n'+ err.message);
        console.error(err)
    }
}

const updateRecruiter = async (req, res) => {

    const logoFilePath = req.file ? req.file.path : '';
    console.log(req.body);
    console.log(req.file);
    try {
        const { companyName, industry, companySize, phone, website, address, city, state } = req.body;
        if (req.file) {
            updateData.logo = req.file.path;
        }

        //const recruiter = await Recruiter.findOneAndUpdate({ user: req.params.id }, updateData, { new: true }); // Update existing or create new

        /* if (!recruiter) {
            return res.status(404).json({ message: 'Recruiter not found' });
        } */

        const recruiter = await Recruiter.findOne({ user: req.params.id });

        // check if user have candidate
        if (!recruiter) {
            const recruiter = new Recruiter({ user: user.id , companyName, address, industry, companySize, website, logo: logoFilePath || '' });
            await recruiter.save();
        } else {
            // if not have update candidate
            if(logoFilePath) {
                const filePath = path.join(__dirname,'..', '', recruiter.logo);
                console.log(filePath);
                fs.unlinkSync(filePath); // Synchronously delete the file
            }
            await recruiter.updateOne({companyName, address, industry, companySize, website, logo: logoFilePath || ''});
        }

        res.status(200).json("Profile has update");

    } catch (err) {
        console.error('Error updating recruiter:', err);
        res.status(500).json({ message: 'Internal server error' });    
    }
}

const deletePro = async (req, res, next) => {
    
}

module.exports = {getRecruiterById, addRecruiter, updateRecruiter, deletePro };

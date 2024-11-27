const { body } = require('express-validator');
const Recruiter = require('../Models/Recruiter');
const User = require('../Models/User');
const busboy = require('busboy');
const Offer = require('../Models/Offer');


// add new offer from recruter
const addOffer = async (req, res, next) => {
    const {id, title, description, profile, job_type, salaire, position} = req.body;
    const user = await User.findById(id);
    try {
        if(user && user.role === "recruiter") {
            const recruiter = await Recruiter.findOne({ user: id });
            const offer = new Offer({ recruiter: recruiter.id, title, description, profile, job_type, salaire, position });
            await offer.save();
            res.status(200).json("Add Successfully completed!");
        } else {
            return res.status(404).json({ error: "Recruiter not found" });
        }
    } catch (error) {
        console.log(error);
    } 
}

// get offer by id
const getOffer = async (req, res, next) => {
    console.log(req.params.id);
    try {
        if(req.params.id.length > 0) {
            const offer = await Offer.findById(req.params.id)
            .populate('recruiter', 'user companyName logo city')
            .exec();
            res.status(200).json(offer);
        }
    } catch (err) {
        console.error(err);
    }
}

// get all offers
const getAllOffers = async (req, res, next) => {
    try {
        const offers = await Offer.find()
        .populate('recruiter', 'companyName logo city')
        .exec();
        res.status(200).json(offers.reverse());
    } catch (err) {
        console.error(err);
    }    
}

// get all my offers
const getMyOffers = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    let offers = [];
    try {
        if(user.role === "recruiter") {
            const recruiter = await Recruiter.findOne({ user: req.params.id });
            offers = await Offer.find({ recruiter: recruiter.id });
            res.status(200).json(offers.reverse());
        } else {
            return res.status(404).json({ error: "Recruiter not found" });
        }
    } catch (error) {
        console.log(error);
    }
}

// update offer
const updateOffer = (req, res) => {
    res.json();
}

// delete offer
const deleteOffer = (req, res) => {
    res.json();
}

module.exports = {addOffer, getOffer, getAllOffers, getMyOffers, updateOffer, deleteOffer};

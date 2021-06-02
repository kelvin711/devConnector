const Profile = require('../models/profile.model');//getting our Profile model
const User = require('../models/user.model');//getting our user model
const express = require('express')
const mongoose = require('mongoose')
//lolad validation
const validateProfileInput = require('../validation/profile')
const validateExperienceInput = require('../validation/experience')
const validateEducationInput = require('../validation/education')


module.exports = {
    test: (req, res) => { //test route
        res.json({ msg: "Profile works"})
    },

    // experience: (req, res) => { //test route
    //     res.json({ msg: "Profile works"})
    // },

    getProfile: (req, res) => {//private route to get a profile
        const errors = {}
        Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar'])
            .then( profile => {
                if(!profile) {
                    errors.noProfile = 'There is no profile for this user'
                    return res.status(404).json(errors)
                }
                res.json(profile)
            })
            .catch( err => res.status(404).json(err))
    },

    findByHandle: (req, res) => {//public route to get any handle
        const errors = {}
        Profile.findOne({ handle: req.params.handle })
            .populate('user', ['name', 'avatar'])
            .then( profile => {
            if(!profile) {
                errors.noProfile = 'There is no profile for this user'
                res.status(404).json(errors)
            }
            res.json(profile)
            })
            .catch( err => res.status(404).json(err))
    },

    findByUser: (req, res) => {//public route to get any handle
        const errors = {}
        Profile.findOne({ user: req.params.userId })
            .populate('user', ['name', 'avatar'])
            .then( profile => {
            if(!profile) {
                errors.noProfile = 'There is no profile for this user'
                res.status(404).json(errors)
            }
            res.json(profile)
            })
            .catch( err => res.status(404).json({ profile: 'There is no profile for this user' }))
    },

    createProfile: (req, res) => {//private route to create a profile and edit
        const { errors, isValid } = validateProfileInput(req.body)
        //check validation
        if(!isValid) {
            return res.status(400).json(errors)
        }
        //get fields
        const profileFields = {}
        profileFields.user = req.user.id
        //if the handle was sent in from the form if so add to object and so on
        if(req.body.handle) profileFields.handle = req.body.handle
        if(req.body.company) profileFields.company = req.body.company
        if(req.body.website) profileFields.website = req.body.website
        if(req.body.location) profileFields.location = req.body.location
        if(req.body.bio) profileFields.bio = req.body.bio
        if(req.body.status) profileFields.status = req.body.status
        if(req.body.githubUserName) profileFields.githubUserName = req.body.githubUserName
        //skills split into array
        if(typeof req.body.skills !== 'undefined') {
            profileFields.skills = req.body.skills.split(',')
        }
        //social links
        profileFields.social = {}
        if(req.body.youtube) profileFields.social.youtube = req.body.youtube
        if(req.body.twitter) profileFields.social.twitter = req.body.twitter
        if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
        if(req.body.facebook) profileFields.social.facebook = req.body.facebook
        if(req.body.instagram) profileFields.social.instagram = req.body.instagram

        Profile.findOne({ user: req.user.id })
            .then( profile => {
                if(profile) {
                    //update
                    Profile.findOneAndUpdate(
                        { user: req.user.id }, 
                        { $set: profileFields }, 
                        { new: true }
                    )
                    .then( profile => res.json(profile))
                } else {
                    //check to see if the handle exists
                    Profile.findOne({ handle: profileFields.handle })
                        .then(profile => {
                            if(profile) {
                                errors.handle = 'That handle already exists'
                                res.status(400).json(errors)
                            }
                            //save profile
                            new Profile(profileFields).save()
                                .then(profile => res.json(profile))
                        })
                }
            })
    },

    getAllProfiles: (req, res) => {//private route to get a profile
        const errors = {}
        Profile.find()
        .populate('user', ['name', 'avatar'])
        .then( profiles => {
            if(!profiles) {
                errors.noProfile = 'There are no profiles'
                return res.status(404).json(errors)
            }
            res.json(profiles)
        })
        .catch(err => res.status(404).json({profiles: 'There are no profiles'}))
    },

    addExperience: (req, res) => {
        
        const { errors, isValid } = validateExperienceInput(req.body)
        //check validation
        if(!isValid) {
            return res.status(400).json(errors)
        }
        Profile.findOne({ user: req.user.id })
        .then( profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description,
            }
            //add to exp array
            profile.experience.unshift(newExp)
            profile.save().then(profile => res.json(profile))

        })
    },

    deleteExperience: (req, res) => {
        Profile.findOne({user: req.user.id})
        .then(profile => {
            //get remove index
            const removeIndex = profile.experience.map( item => item.id)
            .indexOf(req.params.expID);
            //splice out of array
            profile.experience.splice(removeIndex, 1)
            //save
            profile.save().then(profile => res.json(profile))
        })
        .catch( err => res.status(404).json(err))
    },
    
    addEducation: (req, res) => {
        
        const { errors, isValid } = validateEducationInput(req.body)
        //check validation
        if(!isValid) {
            return res.status(400).json(errors)
        }
        Profile.findOne({ user: req.user.id })
        .then( profile => {
            const newEducation = {
                school: req.body.school,
                degree: req.body.degree,
                fieldOfStudy: req.body.fieldOfStudy,
                from: req.body.from,
                to: req.body.to,
                description: req.body.description,
            }
            //add to exp array
            profile.education.unshift(newEducation)
            profile.save().then(profile => res.json(profile))

        })
    },

    deleteEducation: (req, res) => {
        Profile.findOne({user: req.user.id})
        .then(profile => {
            //get remove index
            const removeIndex = profile.education.map( item => item.id)
            .indexOf(req.params.educationID);
            //splice out of array
            profile.education.splice(removeIndex, 1)
            //save
            profile.save().then(profile => res.json(profile))
        })
        .catch( err => res.status(404).json(err))
    },

    
    deleteProfileAndUser: (req, res) => {
        Profile.findOneAndRemove({user: req.user.id})
            .then( () => {
                User.findOneAndRemove({ _id: req.user.id})
                    .then( () => res.json({success: true}))
            })
        .catch( err => res.status(404).json(err))
    },
}
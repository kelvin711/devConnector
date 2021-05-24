const Profile = require('../models/profile.model');//getting our Profile model
const User = require('../models/user.model');//getting our user model
const express = require('express')
const mongoose = require('mongoose')




module.exports = {
    test: (req, res) => { //test route
        res.json({ msg: "Profile works"})
    },
    getProfile: (req, res) => {//private route to get a profile
        const errors = {}
        Profile.findOne({ user: req.user.id })
            .then( profile => {
                if(!profile) {
                    errors.noProfile = 'There is no profile for this user'
                    return res.status(404).json(errors)
                }
                res.json(profile)
            })
            .catch( err => res.status(404).json(err))
    },
    createProfile: (req, res) => {//private route to create a profile
        const errors = {}
        Profile.findOne({ user: req.user.id })
            .then( profile => {
                if(!profile) {
                    errors.noProfile = 'There is no profile for this user'
                    return res.status(404).json(errors)
                }
                res.json(profile)
            })
            .catch( err => res.status(404).json(err))
    },
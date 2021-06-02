const ProfileController = require('../controllers/profile.controllers')
const passport = require('passport'); //for protected routes


module.exports = app => {//making a function and bringing in app
    //test route
    app.get('/api/profiles/test', ProfileController.test)
    //get all profiles
    app.get('/api/profile/all', ProfileController.getAllProfiles);
    //get current user profile
    app.get('/api/profile', passport.authenticate('jwt', { session: false }), ProfileController.getProfile);
    //get profile by handle
    app.get('/api/profile/handle/:handle', ProfileController.findByHandle)
    //get profile by user id
    app.get('/api/profile/user/:userId', ProfileController.findByUser)
    //create profile
    app.post('/api/profile', passport.authenticate('jwt', { session: false }), ProfileController.createProfile);
    //add an experience
    app.post('/api/profile/experience', passport.authenticate('jwt', { session: false }), ProfileController.addExperience)
    //add education
    app.post('/api/profile/education', passport.authenticate('jwt', { session: false }), ProfileController.addEducation)
    //delete experience
    app.delete('/api/profile/experience/:expID', passport.authenticate('jwt', { session: false }), ProfileController.deleteExperience)
    //delete education
    app.delete('/api/profile/education/:educationID', passport.authenticate('jwt', { session: false }), ProfileController.deleteEducation)
    //delete profile and user
    app.delete('/api/profile/delete', passport.authenticate('jwt', { session: false }), ProfileController.deleteProfileAndUser)
}
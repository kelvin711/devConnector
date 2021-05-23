const ProfileController = require('../controllers/profile.controllers')
const passport = require('passport') //for protected routes

module.exports = app => {//making a function and bringing in app
    //test route
    app.get('/api/profiles/test', ProfileController.test)
    //get current usere profile
    app.get('/api/profile', passport.authenticate('jwt', { session: false }), ProfileController.getProfile);
    // //register route
    // app.post('/api/users/register', UserController.register);
    // //login route
    // app.post('/api/users/login', UserController.login)
    
}
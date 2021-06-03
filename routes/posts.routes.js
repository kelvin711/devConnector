const PostsController = require('../controllers/posts.controllers');
const passport = require('passport'); //for protected routes


module.exports = app => {//making a function and bringing in app
    //test route
    app.get('/api/posts/test', PostsController.test)
    // //create a post 
    app.post('/api/post/create', passport.authenticate('jwt', { session: false }), PostsController.createPost);
    // //fetch all posts
    app.get('/api/posts/all', PostsController.getAllPosts);
    // //fetch a single post
    app.get('/api/post/:postID', PostsController.getPost);
    // //get profile by user id
    // app.get('/api/profile/user/:userId', ProfileController.findByUser)
    // //create profile
    // app.post('/api/profile', passport.authenticate('jwt', { session: false }), ProfileController.createProfile);
    // //add an experience
    // app.post('/api/profile/experience', passport.authenticate('jwt', { session: false }), ProfileController.addExperience)
    // //add education
    // app.post('/api/profile/education', passport.authenticate('jwt', { session: false }), ProfileController.addEducation)
    // //delete experience
    // app.delete('/api/profile/experience/:expID', passport.authenticate('jwt', { session: false }), ProfileController.deleteExperience)
    // //delete education
    // app.delete('/api/profile/education/:educationID', passport.authenticate('jwt', { session: false }), ProfileController.deleteEducation)
    // //delete profile and user
    // app.delete('/api/profile/delete', passport.authenticate('jwt', { session: false }), ProfileController.deleteProfileAndUser)
}
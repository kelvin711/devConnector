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
    // //delete post
    app.delete('/api/post/:postID/delete', passport.authenticate('jwt', { session: false }), PostsController.deletePost)
    //like a post
    app.post('/api/post/:postID/like', passport.authenticate('jwt', { session: false }), PostsController.likePost);
    //unlike a post
    app.post('/api/post/:postID/unlike', passport.authenticate('jwt', { session: false }), PostsController.unlikePost);
    //add comment
    app.post('/api/post/comment/:postID', passport.authenticate('jwt', { session: false }), PostsController.addComment)
    //delete comment
    app.delete('/api/post/comment/:postID/:commentID/delete', passport.authenticate('jwt', { session: false }), PostsController.deleteComment)
}
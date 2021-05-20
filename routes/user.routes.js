const UserController = require('../controllers/user.controllers')

module.exports = app => {//making a function and bringing in app
    //test route
    app.get('/api/users/test', UserController.test)
    //index route for all the users
    app.get('/api/users', UserController.index);
    //register route
    app.post('/api/users/register', UserController.register);
    //login route
    app.post('/api/users/login', UserController.login)
}






// const express = require('express');
// const router = express.Router();
// const gravatar = require('gravatar');
// const bcrypt = require('bcryptjs');

// //load User model
// const User = require('../../models/user.model')

// //@route GET api/users/test
// //@desc Tests user route
// //@access public route
// router.get('/test', (req, res) => res.json({ msg: "Users works"}));

// //@route GET api/users/register
// //@desc register a user
// //@access public route
// router.post('/create', (req, res) => {
//     User.findOne({ email: req.body.email })
//     .then( user => {
//         if(user) {
//             return res.status(400).json({email: 'Email already exists'})
//         } else {
//             const avatar = gravatar.url(req.body.email, {
//                 s: '200', //Size
//                 r: 'pg', //Rating
//                 d: 'mm' //Default
//             })
//             const newUser = new User({
//                 name: req.body.name,
//                 email: req.body.email,
//                 avatar,
//                 password: req.body.password,
//             });
//             bcrypt.genSalt(10, (err, salt) => {
//                 bcrypt.hash(newUser.password, salt, (err, hash) => {
//                     if(err) throw err;
//                     newUser.password = hash;
//                     newUser.save()
//                         .then( user => res.json(user))
//                         .catch( err => console.log(err))
                        
                    
//                 })
//             })
//         }
//     })
// })

// //@route POST api/users/login
// //@desc login user / returning JWT token
// //@access public route

// router.post('/login', (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     //find user by email
//     User.findOne({ email }).then( user => {
//         //check for user
//         if(!user) {
//             return res.status(404).json({email: 'User not found'})
//         }
//         //check password
//         bcrypt.compare(password, user.password)
//             .then( isMatch => {
//                 if(isMatch) {
//                     res.json({ msg: 'Success' })
//                 } else {
//                     return res.status(400).json({ password: 'Invalid Credentials' })
//                 }
//             })
//     })
// })



// module.exports = router
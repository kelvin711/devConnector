const User = require('../models/user.model');//getting our User model
const gravatar = require('gravatar');//gravatar for user pfp
const bcrypt = require('bcryptjs');//bcrypt for password hashing
const jwt = require('jsonwebtoken')//jason webtoken
const keys = require('../config/keys');//accessing secret keys
// load input validations
const validateRegisterInput = require('../validation/register')
const validateLoginInput = require('../validation/login')

//object with key value, keys are restful route names, values are functions
//need to export these all

module.exports = {
    test: (req, res) => { //test route
        res.json({ msg: "Users works"})
    },
    index: (req, res) => { //index is the restful pattern for routing
        User.find() //mongoose built in queries
            .then( users => res.json({ allusers : users}))//Products is all of the prods, then 
            //responding with a json object and putting it in the allProducts variable
    },
    current: (req, res) => {// returns the current user, private route        
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
        })
    },
    register: (req, res) => {
        //pulling out the errors and isValid
        const { errors, isValid } = validateRegisterInput(req.body)
        //check validation
        if(!isValid) {
            return res.status(400).json(errors)
        }
        User.findOne({ email: req.body.email })
            .then( user => {
                if(user) {
                    errors.email = 'Email already exist senpai'
                    return res.status(400).json(errors)
                } else {
                    const avatar = gravatar.url(req.body.email, {
                        s: '200',//size
                        r: 'pg',//rating
                        d: 'mm' //default
                    })
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        avatar,
                        password: req.body.password
                    })

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;
                            newUser.password = hash
                            newUser.save()
                                .then( user => res.json(user))
                                .catch( err => console.log(err))
                        })
                    })
                }
            })
    },
    login: (req, res) => {
        //pulling out the errors and isValid
        const { errors, isValid } = validateLoginInput(req.body)
        //check validation
        if(!isValid) {
            return res.status(400).json(errors)
        }
        const email = req.body.email;
        const password = req.body.password;
        //find user by email
        User.findOne({ email }).then( user => {
            //check for user
            if(!user) {
                errors.email = 'Invalid Credentials'
                return res.status(404).json(errors)
            }
            //check password
            bcrypt.compare(password, user.password)
                .then( isMatch => {
                    if(isMatch) {
                        //user matched
                        // res.json({ msg: 'Success' })
                        //jwt payload
                        const payload = { 
                            id: user.id, 
                            name: user.name, 
                            avatar: user.avatar 
                        }

                        //sign the token
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 7200 }, (err, token) => {
                            res.json({
                                sucess: true,
                                token: 'Bearer ' + token
                            })
                        })
                    } else {
                        errors.password = 'Invalid Credentials'
                        return res.status(400).json(errors)
                    } 
                })
        })
    },

    
    
}


// show: (req, res) => {
//     Product.findOne({ _id: req.params.id})
//         .then( oneProduct => res.json({ showProduct : oneProduct }))
//         .catch( err => res.json(err.errors));
// },
// create :(req,res) => { //create is the restful pattern
//     Product.create(req.body) //mongoose built in queries
//         .then( newlyCreatedProduct => res.json({ createProduct : newlyCreatedProduct }))
//         .catch( err => res.json(err.errors));
// },
// update: (req, res) => {
//     Product.findOneAndUpdate({ _id: req.params.id }, req.body, {new : true})
//         .then( updatedProduct => res.json({ updateProduct: updatedProduct }))
//         .catch( err => res.json(err.errors));
// }, 
// destroy : (req, res) => {
//     Product.deleteOne({ _id: req.params.id })
//     .then( ProductToDelete => res.json({ ProductToDelete : ProductToDelete }))
//     .catch(err => res.json(err.errors));
// }
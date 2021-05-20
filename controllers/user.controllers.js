const User = require('../models/user.model');//getting our User model
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

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
    register: (req, res) => {
        User.findOne({ email: req.body.email })
            .then( user => {
                if(user) {
                    return res.status(400).json({ email: 'Email already exist senpai' })
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
                            newUser.password = bcrypt.hash
                            newUser.save()
                                .then( user => res.json(user))
                                .catch( err => console.log(err))
                        })
                    })
                }
            })
    },
    login: (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        //find user by email
        User.findOne({ email }).then( user => {
            //check for user
            if(!user) {
                return res.status(404).json({email: 'Invalid Credentials'})
            }
            //check password
            bcrypt.compare(password, user.password)
                .then( isMatch => {
                    if(isMatch) {
                        res.json({ msg: 'Success' })
                    } else {
                        return res.status(400).json({ password: 'Invalid Credentials' })
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
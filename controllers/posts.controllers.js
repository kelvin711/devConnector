const Post = require('../models/posts.model')
const Profile = require('../models/profile.model');//getting our Profile model
const User = require('../models/user.model');//getting our user model
const express = require('express')
const mongoose = require('mongoose')
//load validation
const validatePostInput = require('../validation/post')


module.exports = {

    test: (req, res) => { //test route
        res.json({ msg: "Posts works"})
    },

    getAllPosts: (req, res) => {//get all posts
        Post.find()
            .sort({date: -1})
            .then(posts => res.json(posts))
            .catch(err => res.status(404).json({noPostsFound: 'No posts found'}))
    },

    getPost: (req, res) => {//get all posts
        Post.findById(req.params.postID)
            .then( post => res.json(post))
            .catch( err => res.status(404).json({noPostFound: 'No post found with that ID'}))
    },

    createPost: (req, res) => {//create a post route
        const { errors, isValid } = validatePostInput(req.body)
        //check validation
        if(!isValid) {
            return res.status(400).json(errors)
        }
        const newPost = new Post({
            text: req.body.text,
            name: req.body.name,
            user: req.body.id,
            avatar: req.body.avatar,
        })

        newPost.save().then( post => res.json(post))
    }

}
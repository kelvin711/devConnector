const Post = require('../models/posts.model')//getting our Post model
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
            user: req.user.id,
            avatar: req.body.avatar,
        })

        newPost.save().then( post => res.json(post))
    },

    deletePost: (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then( profile => {
                // console.log("this is postID variable inside ", postID)
                Post.findById(req.params.postID)
                    .then(post => {
                        //check for post owner
                        if(post.user.toString() !== req.user.id) {
                            return res.status(401).json({ notAuthorized: 'User not authorized' })
                        }
                        //delete
                        post.remove().then(() => res.json({ success: true }))
                    })
                    .catch(err => res.status(404).json({ postNotFound: 'Post not found' }))
            })
    },

    likePost: (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                Post.findById(req.params.postID)
                    .then( post => {
                        //check to see if user already liked the post
                        if(post.likes.filter( like => like.user.toString() === req.user.id).length > 0) {
                            return res.status(400).json({ alreadyLiked: 'User has already liked this post'})
                        }
                        //add user id to the likes array
                        post.likes.unshift({ user: req.user.id })
                        post.save().then( post => res.json(post))
                    })
                    .catch(err => res.status(404).json({ postNotFound: 'No post found'}))
            })
    },

    unlikePost: (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                Post.findById(req.params.postID)
                    .then( post => {
                        console.log(post)
                        //check to see if user is already in the like array
                        if(post.likes.filter( like => like.user.toString() === req.user.id).length === 0) {
                            return res.status(400).json({ alreadyLiked: 'You have not yet liked this post'})
                        }
                        //get remove index
                        let removeIndex = post.likes.map( 
                            eachLike => eachLike.user.toString()
                        ).indexOf(req.user.id)
                        //splice out of array
                        post.likes.splice(removeIndex, 1)
                        //save
                        post.save().then(post => res.json(post))
                    })
                    .catch(err => res.status(404).json({ postNotFound: 'No post found'}))
            })
    },

    addComment: (req, res) => {
        const { errors, isValid } = validatePostInput(req.body)
        //check validation
        if(!isValid) {
            return res.status(400).json(errors)
        }
        Post.findById(req.params.postID)
            .then(post => {
                const newComment = {
                    text: req.body.text,
                    name: req.body.name,
                    avatar: req.body.avatar,
                    user: req.user.id
                }
                //add to comment array
                post.comments.unshift(newComment)
                post.save().then(post => res.json(post))
            })
            .catch(err => res.status(404).json({ postNotFound: 'No post found'} ))
    },

    deleteComment: (req, res) => {
        Post.findById(req.params.postID)
            .then( post => {
                //chec to see if comment exists
                if(post.comments.filter(comment => comment._id.toString() === req.params.commentID).length === 0) {
                    return res.status(404).json({ commentDoesNotExist: 'Comment does not exist' })
                }
                //get remove index
                const removeIndex = post.comments.map( comment => comment._id.toString())
                    .indexOf(req.params.commentID)
                //splice comment out of the array
                post.comments.splice(removeIndex, 1)
                post.save().then(post => res.json(post))
            })
            //.catch(err => res.status(404).json({ postNotFound: 'No post found'} ))
    },

}
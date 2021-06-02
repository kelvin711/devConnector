const mongoose = require("mongoose"); //importing mongoose

const PostSchema = new mongoose.Schema({//making a new schema from mongoose.Schema constructor
    user: {
        type: Schema.Types.ObjectID,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    avatar: {
        type: String,
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectID,
                ref: 'users'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectID,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
            },
            name: {
                type: String,
            },
            avatar: {
                type: String,
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
},{timestamps:true});//for created at and updated at

const Post = mongoose.model("posts", PostSchema);//creating a variable to be set to mongoose.model

module.exports = Post//exporting the Post constructor

//module.exports.Dog = mongoose.model("Dog", DogSchema); have to deconstruct if doing it this way
const mongoose = require("mongoose"); //importing mongoose

const UserSchema = new mongoose.Schema({//making a new schema from mongoose.Schema constructor
    name: {
        type: String,
        required: [true, "A product must have a title"],
    },
    email: {
        type: String,
        required: [true, "Email is required."]
    },
    password: {
        type: String,
        required: [true, "Password must be present"],
        min: [1, "Must have a price over a dollar."]
    },
    avatar: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
},{timestamps:true});//for created at and updated at

const Product = mongoose.model("users", UserSchema);//creating a variable to be set to mongoose.model

module.exports = Product//exporting the dog constructor

//module.exports.Dog = mongoose.model("Dog", DogSchema); have to deconstruct if doing it this way
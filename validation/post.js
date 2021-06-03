const Validator = require('validator') //bringing in validator
const isEmpty = require('./is-empty')

module.exports = function validatePostInput(data) {
    let errors = {}
    //if nothing is inputed it wont be an empty string, need to make it into one

    data.text = !isEmpty(data.text) ? data.text : ''

    if(!Validator.isLength(data.text, {min: 10, max: 300})) {
        errors.text = 'Post must be between 10 and 300 characters'
    }

    if(Validator.isEmpty(data.text)) {
        errors.text = 'Text field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
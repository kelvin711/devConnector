const Validator = require('validator') //bringing in validator
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data) {
    let errors = {}
    //if nothing is inputed it wont be an empty string, need to make it into one

    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''


    if(!Validator.isEmail(data.email)) {
        errors.email = 'Invalid credentials'
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = 'Email is required'
    }

    
    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
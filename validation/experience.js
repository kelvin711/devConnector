const Validator = require('validator') //bringing in validator
const isEmpty = require('./is-empty')

module.exports = function validateExperienceInput(data) {
    let errors = {}
    //if nothing is inputed it wont be an empty string, need to make it into one

    data.title = !isEmpty(data.title) ? data.title : ''
    data.company = !isEmpty(data.company) ? data.company : ''
    data.from = !isEmpty(data.from) ? data.from : ''


    if(Validator.isEmpty(data.title)) {
        errors.title = 'Job title is required'
    }

    if(Validator.isEmpty(data.company)) {
        errors.company = 'Company field is required'
    }

    if(Validator.isEmpty(data.from)) {
        errors.from = 'From date field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
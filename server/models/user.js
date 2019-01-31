const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {hashPassword} = require('../helpers')

var userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        validate: [{
            validator: v => {
                return /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/.test(v)
            },
            message: 'Invalid Email Format'
        }],
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        minlength: [8, 'Password must have 8 characters'],
        required: [true, 'Password is required']
    }
})

userSchema.pre('save', function (next) {
    if(this.password) {
        this.password = hashPassword(this.password)
    }
    User.findOne({email: this.email})
    .then(user => {
        if(user) {
            next(`Email already been used`)
        } else {
            next()
        }
    })
    .catch(err => {
        next(err)
    })
})


const User = mongoose.model('User', userSchema)

module.exports = User
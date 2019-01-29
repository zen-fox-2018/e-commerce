const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {hash} = require('../helpers/index')

var userSchema = new Schema({
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        validate : {
            isAsync : true,
            validator : function(email){
               return User.findOne({ email : email})
                .then(user => {
                    if(user){
                        throw false
                    }
                })
                .catch(err => {
                    throw false
                })
            },  message :'User already exist',
        }
    },
    password : {
        type: String
    },
    firstName : {
        type: String
    },
    lastName  : {
        type : String
    },
    role : {
        type : String,
        default : 'customer'
    },
    point : {
        type : Number,
        default : 0
    },
})

userSchema.pre('save', function(next){
    this.password = hash(this.password)
    next()
})

var User = mongoose.model('User', userSchema)

module.exports = User
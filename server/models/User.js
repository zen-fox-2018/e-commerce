const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name must be filled!']
    },
    email: {
        type: String,
        required: [true, 'Email must be filled!'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        validate: {
            validator: function (email) {
                return new Promise((resolve, reject) => {
                    User
                        .findOne({ email: email, _id: { $ne: this._id } })
                        .then(found => {
                           if(found) {
                            reject(false) 
                            } else {
                            resolve(true)
                            }
                        })
                })
            }, msg: `Email already exists!`
        }
    },
    password: {
        type: String,
        required: [true, 'Password must be filled!'],
        minlength: [6, 'Failed, minimal input password 6 characters']
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        default: 'Customer'
    },
    wishlist: [
        {
            type: Schema.Types.ObjectId, ref: `Product`
        }
    ]
})

UserSchema.pre('save', function (next) {
    const salt = bcrypt.genSaltSync(10)
    this.password = bcrypt.hashSync(this.password, salt)
    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User
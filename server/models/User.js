var mongoose = require(`mongoose`)
var Schema = mongoose.Schema
var helpers = require(`../helpers/helpers`)

var UserSchema = new Schema({
    email: {
        type: String,
        validate: {
            validator: function (email) {
                return User.findOne({
                    email: email,
                    _id: {
                        $ne: this._id
                    }
                }).then((result) => {
                    if (result) {
                        throw "Email sudah ada"
                    }
                }).catch((err) => {
                    console.log(`error validasi di .catch`);
                    
                    throw err
                });
            }
        }
    },
    password: String,
    provinceId: Number,
    cityId: Number
})

UserSchema.pre(`save`, function (next) {
    if (this.password) {
        this.password = helpers.hash(this.password)
        next()
    } else {
        next()
    }
})

var User = mongoose.model('User', UserSchema)
module.exports = User
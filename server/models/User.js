var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const { encrypt } = require('../helpers/bcrypt')

var userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: [{
      validator: function(value) {
        return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(value)
      }, 
      message: `Invalid email/password`
    }, { 
      validator : function(value, cb) {
        return new Promise( function(resolve, reject) {
          User.findOne({ 
            email : value 
          }, function(err, data){
            if(err) throw error
            else{
              if (data){
                reject(false)
              }else{
                resolve(true)
              }
            }
          })
        })
      },
      message: 'Duplicate email'
    }]
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
});

userSchema.pre('save', function(next){
  this.password = encrypt(this.password)
  next()
})

var User = mongoose.model('User', userSchema);

module.exports = User
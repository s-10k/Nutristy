var mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose')

// var UserSchema = new mongoose.Schema({
//   username: { type: String, unique: true, required: true },
//   password: String,
//   email: { type: String, unique: true, required: true },
//   avatar: String,
//   isAdmin: { type: Boolean, default: false },
//   resetPasswordToken: String,
//   resetPasswordExpires: Date
// })

//for user registration
//consider: making email unique (helps in log in)
const UserSchema = new mongoose.Schema({
  username:String,
  email:String,
  address:String,
  mealpref:String,
  allergy:{
    type: String,
    default: "none"
  },
  password:String,
  phone:Number
}) ;

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);

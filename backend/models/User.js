const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
   name: {
    type: String,
    require: true
   },
   email: {
    type: String,
    require: true,
    unique: true
   },
   password: {
    type: String,
    require: true
   },
   date: {
    type: Date,
    default: Date.now
   }
  });
//   create data base 
  const User =  mongoose.model("user", UserSchema );
  // User.createIndexes() we dont want to create index corresponding to email beacuse we did email unique true
  module.exports = User
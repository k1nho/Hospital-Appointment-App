const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  appointments:[
      {
        firstName: String,
        lastName: String,
        gender: String,
        email: String,
        birthDate: Date,
        description: String,
        insurance: String,
        medCondition: Array,
        appointmentDate: Date
      }
    ]
});
module.exports = User = mongoose.model("users", UserSchema);
const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
 name: { type: String, required: true },
  idNumber: { type: String, required: true },
  saceNumber: String,
  postLevel: String,
  contact: String,
  signature: { type: String }, // base64 data URL from frontend
});

const registerSchema = new mongoose.Schema({
  providerName: String,
  providerNumber: String,
  activityName: String,
  date: String,
  venue: String,
  district: String,
  duration: String,
  pdPoints: String,
  contactPerson: String,
  contactNumber: String,
  email: String,
  participants: [participantSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Register', registerSchema);

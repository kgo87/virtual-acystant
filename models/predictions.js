/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user");

const findingsSchema = new Schema({
  findings: [{
    probability: Number,
    className: String
  }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
});


const Finding = mongoose.model("Finding", findingsSchema);

module.exports = Finding;
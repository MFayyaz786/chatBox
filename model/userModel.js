const mongoose = require("mongoose");
const Schema = new mongoose.Schema();
const schema = mongoose.Schema({
  email: { type: String },
  contact: { type: String },
});
const userModel = new mongoose.model("User", schema);
module.exports = userModel;

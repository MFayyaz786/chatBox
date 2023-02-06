const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
  title: String,
  rate: String,
  status: String,
});
const bookModel = new mongoose.model("books", schema);
module.exports = bookModel;

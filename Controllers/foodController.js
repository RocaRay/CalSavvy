const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: String,
  calories: Number
});

module.exports = mongoose.model('Food', foodSchema);
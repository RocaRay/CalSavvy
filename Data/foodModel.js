const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  date: {type: Date, default: Date.now},
  eaten: {type: Object, required: true},
  totalCalories: {type: Number, required: true}
});

module.exports = mongoose.model('Food', foodSchema);
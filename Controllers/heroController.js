const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const heroesSchema = new Schema({
  name: String,
  quirk: String
});

module.exports = mongoose.model('Heroes', heroesSchema);
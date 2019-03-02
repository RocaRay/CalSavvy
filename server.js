const mongoose = require('mongoose');
const express = require('express');
const app = express();
const uri = "mongodb+srv://rocaray:hunter2@raymdb-snjyo.mongodb.net/test?retryWrites=true";


const Hero = require('./Controllers/heroController.js')

// mongodb://localhost/mongodb-om
mongoose.connect(uri, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected agane');
  Hero.create({
    name: 'All Might',
    quirk: 'One for All'
  }, (err, result) => {
    if (err) console.log(err);
    if (result) console.log(result);
  })
})

app.listen(8888, () => {
  console.log('Listening on port 8888');
})
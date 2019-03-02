const mongoose = require('mongoose');
const uri = "mongodb+srv://rocaray:hunter2@raymdb-snjyo.mongodb.net/test?retryWrites=true";
const Hero = require('./Controllers/heroController.js') //import Hero model
const heroList = require('./heroList');

// mongodb://localhost/mongodb-om
mongoose.connect(uri, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to database');
  heroList.forEach( heroObj => {
    Hero.create(heroObj)
  }, (err, result) => { 
    if (err) console.log(err);
  })
})

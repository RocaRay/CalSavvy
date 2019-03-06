const mongoose = require('mongoose');
const uri = "mongodb+srv://rocaray:hunter2@raymdb-snjyo.mongodb.net/test?retryWrites=true";
const Food = require('../Data/foodModel') //import Food model
const foodList = require('../foodList')

mongoose.connect(uri, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to database');
  foodList.forEach( item => {
    Food.create(item)
  }, (err, result) => { 
    if (err) console.log(err);
    else if (result) console.log('create success')
  })
})
mongoose.connection.close();
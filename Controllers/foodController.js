const Food = require('../Data/foodModel.js') //import Food model
const mongoose = require('mongoose');
const uri = "mongodb+srv://rocaray:hunter2@raymdb-snjyo.mongodb.net/test?retryWrites=true";

module.exports = {
  postItem: function(req, res) {
    console.log('req.body', req.body)
    mongoose.connect(uri, { useNewUrlParser: true });
    mongoose.connection.once('open', () => {
      console.log('connected to database');
        Food.create({
          eaten: req.body.eaten,
          totalCalories: req.body.totalCalories
        }, (err, result) => {
          if (err) {
            console.log('post error')
            return res.status(400).send('error posting data')
          }
          if (result) {
            console.log('post success')
            return res.status(200).send('post success')
          }
        })
      })
  },

  showAllLogs: function(req, res) {
    mongoose.connect(uri, { useNewUrlParser: true });
    mongoose.connection.once('open', () => {
      console.log('connected to database');
      Food.find({}, (err, result) => {
        if (err) {
          console.log('get error');
          return res.status(400).send('Error retrieving data.')
        }
        if (result) {
          console.log('get success', result);
          return res.status(200).send(result)
        }
      })
        
      })
  }
}
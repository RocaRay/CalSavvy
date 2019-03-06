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
            return res.send('error posting data')
          }
          if (result) {
            console.log('post success')
            return res.send('post success')
          }
        })
      })
  }
}
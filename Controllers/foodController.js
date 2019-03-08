const Food = require('../Data/foodModel.js') //import Food model
const mongoose = require('mongoose');
const uri = "mongodb+srv://rocaray:hunter2@raymdb-snjyo.mongodb.net/soloproject?retryWrites=true"; 
//uri: mongodb+srv://<username>:<password>@raymdb-snjyo.mongodb.net/<database name>?retryWrites=true


module.exports = {
  postItem: function(req, res) {
    // console.log('req.body', req.body)
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
        // if (result) {
        //   console.log('get success', result);
        //   return res.status(200).send(result)
        // }
      }).then((result) => res.status(200).send(result))
        
      })
  },

  deleteAllItems: function(req, res) {
    mongoose.connect(uri, { useNewUrlParser: true });
    Food.deleteMany({}, (err, result) => {
      if (err) console.log('delete err');
      if (result) console.log('delete success', result);
      return res.send('delete success');
    })
  }
}
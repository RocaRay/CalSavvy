const express = require('express');
const app = express();
const foodController = require('./Controllers/foodController.js')
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static('dist'));

app.get('/showAllDays', foodController.showAllLogs);
app.post('/', bodyParser.json(), foodController.postItem);
app.delete('/', foodController.deleteAllItems);

app.listen(8888, () => {
  console.log('Listening on port 8888');
})

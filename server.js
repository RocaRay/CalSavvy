const express = require('express');
const app = express();
const heroList = require('./heroList')

app.get('/', (req, res) => {
  res.send(heroList);
})

app.listen(8888, () => {
  console.log('Listening on port 8888');
})

const express = require('express');
const ejs = require('ejs');
const numberRoutes = require('./routes/numbers');

const app = express();

app.set('view engine', 'ejs');

app.use('/numbers', numberRoutes);

app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});
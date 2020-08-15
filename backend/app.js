const express = require('express');
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/places-routes');

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use('/api/places', placesRoutes);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.send({ message: error.message || 'An unknown error occured!' });
});

app.listen(port, () => {
  console.log('app started');
});

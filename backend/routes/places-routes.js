const express = require('express');

const HttpError = require('../models/http-error');

const router = new express.Router();

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: 'u1',
  },
];

router.get('/:pid', (req, res, next) => {
  const place = DUMMY_PLACES.find((place) => place.id === req.params.pid);
  if (!place) {
    return next(new HttpError('Could not find a place for provided id', 404));
  }
  console.log('req.params', req.params);
  res.send({ place: place });
});

router.get('/user/:uid', (req, res, next) => {
  const place = DUMMY_PLACES.find((place) => place.creator === req.params.uid);
  if (!place) {
    return next(new HttpError('Could not find a place for provided user id'));
  }
  res.send({ place: place });
});

module.exports = router;

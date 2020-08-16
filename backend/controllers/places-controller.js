const HttpError = require('../models/http-error');

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

const getPlaceById = (req, res, next) => {
  const place = DUMMY_PLACES.find((place) => place.id === req.params.pid);
  if (!place) {
    return next(new HttpError('Could not find a place for provided id', 404));
  }
  console.log('req.params', req.params);
  res.send({ place: place });
};

const getPlacesByUserId = (req, res, next) => {
  const places = DUMMY_PLACES.filter(
    (place) => place.creator === req.params.uid
  );
  if (!places || places.length === 0) {
    return next(new HttpError('Could not find places for provided user id'));
  }
  res.send({ places: place });
};

const createPlace = (req, res) => {
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);
  console.log('DUMMY_PLACES', DUMMY_PLACES);
  res.status(201).send(createdPlace);
};

const updatePlace = (req, res) => {
  const { title, description } = req.body;
  let updatedPlace = {
    ...DUMMY_PLACES.find((place) => place.id === req.params.pid),
  };
  const placeIndex = DUMMY_PLACES.findIndex(
    (place) => place.id === req.params.pid
  );
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(201).send({ place: updatedPlace });
};

const deletePlace = (req, res) => {
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== req.params.pid);
  res.status(200).send({ message: 'Deleted' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;

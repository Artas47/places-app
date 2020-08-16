const HttpError = require('../models/http-error');
const Place = require('../models/place');
const getCoordsForAdress = require('../utils/location');

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

const getPlaceById = async (req, res, next) => {
  const _id = req.params.pid;
  let place;
  try {
    place = await Place.findById(_id);
    res.send({ place });
  } catch (err) {
    return next(new HttpError('Could not find a place for provided id', 404));
  }
  if (!place) {
    return next(new HttpError('Could not find a place for provided id', 404));
  }
};

const getPlacesByUserId = async (req, res, next) => {
  let places;
  try {
    places = await Place.find({ creator: req.params.uid });
    res.send({ places });
  } catch (err) {
    return next(
      new HttpError('Fetching places failed, please try again later', 500)
    );
  }
  if (!places || places.length === 0) {
    return next(new HttpError('Could not find places for provided user id'));
  }
};

const createPlace = async (req, res, next) => {
  const { title, description, address, creator, image } = req.body;
  const coordinates = await getCoordsForAdress(address);
  const place = new Place({
    title,
    description,
    location: coordinates,
    address,
    creator,
    image,
  });

  try {
    await place.save();
    res.status(201).send(place);
  } catch (err) {
    console.log('err', err);
    return next(new HttpError('Creating place failed, please try again.', 500));
  }
};

const updatePlace = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['title', 'description'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return next(new HttpError('Invalid operation', 400));
  }

  try {
    const _id = req.params.pid;
    const place = await Place.findById(_id);
    console.log('place', place);
    if (!place) {
      return next(new HttpError('Could not find place', 404));
    }

    updates.forEach((update) => (place[update] = req.body[update]));
    await place.save();
    res.send(place);
  } catch (err) {
    return next(new HttpError('Could not update place', 400));
  }
};

const deletePlace = async (req, res, next) => {
  try {
    const _id = req.params.pid;
    const place = await Place.findByIdAndDelete(_id);
    if (!place) {
      return next(new HttpError('Could not find place', 404));
    }
    res.status(200).send({ message: 'Deleted' });
  } catch (err) {
    return next(new HttpError('Could not delete place', 400));
  }
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;

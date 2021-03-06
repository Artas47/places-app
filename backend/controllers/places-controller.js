const HttpError = require("../models/http-error");
const Place = require("../models/place");
const getCoordsForAdress = require("../utils/location");
const User = require("../models/user");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const fs = require("fs");
const _ = require("lodash");

const getPlaceById = async (req, res, next) => {
  const _id = req.params.pid;
  let place;
  try {
    place = await Place.findById(_id);
    res.send({ place });
  } catch (err) {
    return next(new HttpError("Could not find place", 404));
  }
  if (!place) {
    return next(new HttpError("Could not find place by provided id", 404));
  }
};

const getPlacesByUserId = async (req, res, next) => {
  let places;
  try {
    places = await Place.find({ creator: req.params.uid });
    res.send({ results: places });
  } catch (err) {
    return next(
      new HttpError("Fetching places failed, please try again later", 500)
    );
  }
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const {
    title,
    description,
    address,
    creator,
    imageWidth,
    imageHeight,
    location,
  } = req.body;

  let placeLocation = null;

  if (JSON.parse(location).coordinates) {
    placeLocation = JSON.parse(location);
  } else if (address) {
    try{
      placeLocation = await getCoordsForAdress(address);
    } catch(err){
      return next(new HttpError("Provided address is not valid"));
    }
  }

  if (!req.file.path) {
    return next(new HttpError("Image is required"));
  }

  const place = new Place({
    title,
    description,
    location: {
      coordinates: placeLocation.coordinates,
      zoom: placeLocation.zoom && placeLocation.zoom,
    },
    address,
    creator,
    image: {
      imageUrl: req.file.path,
      width: imageWidth,
      height: imageHeight,
    },
  });

  let user;

  try {
    user = await User.findById(creator);
  } catch (err) {
    return next(new HttpError("Something went wrong. Try again later."));
  }

  if (!user) {
    return next(new HttpError("User not found"));
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await place.save({ session });
    user.places.push(place);
    await user.save({ session });
    await session.commitTransaction();
    res.status(201).send(place);
  } catch (err) {
    return next(new HttpError("Creating place failed, please try again.", 500));
  }
};

const getRandomPlaces = async (req, res, next) => {
  const shuffledPlaces = _.shuffle(res.paginatedResults.results);
  res.send({ ...res.paginatedResults, results: shuffledPlaces });
};

const updatePlace = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return next(new HttpError("Invalid operation", 400));
  }

  try {
    const _id = req.params.pid;
    const place = await Place.findById(_id);

    if (!place) {
      return next(new HttpError("Could not find place", 404));
    }

    if (place.creator.toString() !== req.userData.userId) {
      return next(new HttpError("You are not allowed to edit this place", 401));
    }

    updates.forEach((update) => (place[update] = req.body[update]));
    await place.save();
    res.send(place);
  } catch (err) {
    return next(new HttpError("Could not update place", 400));
  }
};

const deletePlace = async (req, res, next) => {
  let place;
  try {
    place = await Place.findById(req.params.pid).populate("creator");
    if (place.creator._id.toString() !== req.userData.userId) {
      return next(
        new HttpError("You are not allowed to delete this place", 401)
      );
    }
  } catch (err) {
    return next(new HttpError("Could not delete place", 400));
  }
  if (!place) {
    return next(new HttpError("Could not find place", 404));
  }

  const imagePath = place.image;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await place.remove({ session });
    place.creator.places.pull(place);
    await place.creator.save({ session });
    await session.commitTransaction();
    res.status(200).send({ message: "Deleted" });
  } catch (err) {
    return next(new HttpError("Could not delete place", 400));
  }
  fs.unlink(imagePath.imageUrl, (err) => {
    console.log(err);
  });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
exports.getRandomPlaces = getRandomPlaces;

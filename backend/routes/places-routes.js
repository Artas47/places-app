const express = require("express");
const fileUpload = require("../middleware/file-upload");

const placesControllers = require("../controllers/places-controller");
const paginatedResults = require("../middleware/pagination");
const Place = require("../models/place");
const router = new express.Router();

const auth = require("../middleware/auth");

router.get(
  "/random",
  paginatedResults(Place, "Place"),
  placesControllers.getRandomPlaces
);

router.get("/:pid", placesControllers.getPlaceById);

router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.use(auth);

router.post("/", fileUpload.single("image"), placesControllers.createPlace);

router.patch("/:pid", placesControllers.updatePlace);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;

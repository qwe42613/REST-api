const uuid = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http_error");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "taipei 101",
    location: 12345,
    description: "adam made it",
    creator: "u1",
  },
];

// 用place ID get資料
const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid;

  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError("Could not find a place for the provided ID", 404);
  }
  res.json({ place });
};

//用user ID get資料
const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });
  if (!places | (places.length === 0)) {
    throw new HttpError("Could not find a place for the provided Creator", 404);
  }
  res.json({ places });
};

// create資料
const createPlace = (req, res, next) => {
  //判斷是否有空值，與route配合
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid input passed, please check your data!", 422);
  }

  const { title, creator, description, location, id } = req.body; // =const title = req.body.title;
  const createPlace = {
    title,
    creator,
    description,
    location,
    id: uuid.v4(),
  };
  DUMMY_PLACES.push(createPlace);
  res.status(201).json({ createPlace });
};

// patch資料
const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid input passed, please check your data!", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = {
    ...DUMMY_PLACES.find((p) => p.id === placeId),
  };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

// delete 資料
const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Delete Success" });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;

const uuid = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http_error");
DUMMY_USERS = [
  {
    id: "u1",
    userName: "adam",
    email: "qwe42613@gmail.com",
    password: "abc123",
  },
];
const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid input passed, please check your data!", 422);
  }

  const { userName, email, password } = req.body;
  const createUser = {
    id: uuid.v4(),
    userName, //userName:userName
    email,
    password,
  };
  DUMMY_USERS.push(createUser);

  res.status(201).json({ user: createUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Could not identify user!!", 401);
  }
  res.json({ message: "Logged in!" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;

const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controllers/user_controller");
const { getUsers } = require("../controllers/user_controller");

const router = express.Router();

router.get("/:uid", userControllers.getUsers);

router.post(
  "/signup",
  [
    check("userName").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  userControllers.signup
);

router.post("/login", userControllers.login);

module.exports = router;

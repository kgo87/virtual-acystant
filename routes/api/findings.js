/* eslint-disable no-undef */
const router = require("express").Router();
const passport = require("passport");
const findingsController = require("../../controllers/findingsController");

// Matches with "/api/predictions"
router
  .route("/")
  .get(findingsController.findAll)
  .post(passport.authenticate('jwt', {session: false}), findingsController.create);

router
  .route("/:id")
  // .get(postController.findById)
  .get(passport.authenticate('jwt', {session: false}), findingsController.findPostsByUser)
module.exports = router; 
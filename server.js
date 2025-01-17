/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require("dotenv").config();

const passport = require("passport");

const express = require("express");
const routes = require("./routes");

const mongoose = require("mongoose");
const formidable = require("formidable");
// const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(passport.initialize());
// Passport config
passport.use(require("./config/jwtPassportStrategy"));

app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/virtualAcystant",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}
);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
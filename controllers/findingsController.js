/* eslint-disable no-undef */
const db = require("../models");

module.exports = {
    // get all predictions
    findAll: function(req, res) {
        db.Finding.find(req.query)
          .sort({ image: -1 })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },  
    // save predictions to the db
    // create: function (req, res) {
    //     console.log(req.body)
    //   db.Finding.create(req.body)
    //     .then((dbModel) => res.json(dbModel))
    //     .catch((err) => res.status(422).json(err));
    // },
    findPostsByUser: function (req, res) {
      console.log("Find by user from post Controller")
      const ObjectId = require("mongoose").Types.ObjectId;
      console.log(req.user._id)
      db.Finding.find({ user: new ObjectId(req.user._id) })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
  },
  create: async(req, res) => {
    // logged in user id = req.user._id
    try {

        const value = {
            ...req.body,
            user: req.user._id
        }
        const model = await db.Finding.create(value);
        console.log(value);
        res.json(model);
    }
    catch(err) {
        console.log(err);
    }
},

  
  }; 
const router = require("express").Router();
let User = require("../models/user.model");
const Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.json("Error: " + err));
});

// router.route("/:id").get((req, res) => {

// })

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      user.username = req.body.username;
      user
        .save()
        .then(res.json("User updated"))
        .catch((err) => res.json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
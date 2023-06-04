const { ObjectId } = require("mongoose").Types;
const { User } = require("../models");

module.exports = {
  // GET all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400).json(err);
      });
  },

  // GET user by id
  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        // if no user is found, send 404
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400).json(err);
      });
  },

  // POST/create user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },

  // PUT/update user by id
  updateUser(req, res) {
    const { id } = req.params;
    const updateUserInfo = req.body;

    User.findOneAndUpdate({ _id: id }, { $set: updateUserInfo }, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400).json(err);
      });
  },

  // DELETE user by id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((dbUserData) => {
        // if no user is found, send 404
        !dbUserData
          ? res.status(404).json({ message: "User not found." })
          : res.json({ message: "User removed." });
      })
      .catch((err) => res.status(400).json(err));
  },

  // POST/create friend
  createFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "User not found." })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // DELETE friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    )
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "User not found." })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },
};

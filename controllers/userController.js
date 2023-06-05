const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // GET all users
  getAllUsers(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // GET user by id
  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .populate("friends")
      .populate("thoughts")
      .select("-__v")
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: "User not found." })
          : res.json({
              user,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // POST/create a user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

  // PUT/update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "User not found." })
          : res.json(dbUserData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE/remove a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((dbUserData) =>
        !dbUserData
          ? res.status(404).json({ message: "User not found." })
          : Thought.deleteMany({ _id: { $in: dbUserData.thoughts } })
      )
      .then(() => res.json({ message: "User deleted with their thoughts." }))
      .catch((err) => res.status(500).json(err));
  },

  // POST/add a friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      ).populate("friends");

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // DELETE/remove a friend
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId } }
      );
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

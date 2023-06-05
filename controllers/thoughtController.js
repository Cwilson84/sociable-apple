const { Thought, User } = require("../models");

module.exports = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },

  // GET a thought by id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .select("-__v")
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ mesage: "No thought found" })
          : res.json(dbThoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST/create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        User.findOneAndUpdate(
          { _id: req.body.userID },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        ).then((user) => {
          res.json(user);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // PUT/update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) =>
        !dbThoughtData
          ? res.status(404).json({ mesage: "No thought found" })
          : res.json(dbThoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE/remove a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: "No thought found" });
        }

        User.findOneAndUpdate(
          { username: dbThoughtData.username },
          { $pull: { thoughts: dbThoughtData._id } }
        )
          .then(() => {
            res.json({ message: "Successfully deleted the thought" });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      })
      .catch((err) => res.status(500).json(err));
  },

  // POST/create a reaction
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { reactions: req.body } },
        { new: true }
      ).populate("reactions");

      if (!thought) {
        return res.status(404).json({ message: "No thought found" });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // DELETE/remove a reaction
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

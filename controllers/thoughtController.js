const { Thought, User } = require("../models");

module.exports = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // GET a thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        // if no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }

        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // POST/create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          // push thought's _id to the specific user we want to update
          { $push: { thoughts: _id } },
          // return the updated user
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        // if no user is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: "User not found." });
          return;
        }

        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // POST/add a reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      // push reaction's _id to the specific thought we want to update
      { $push: { reactions: req.body } },
      // return the updated thought
      { new: true }
    )
      .then((dbThoughtData) => {
        // if no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: "Thought not found." });
          return;
        }

        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // PUT/update a thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((dbThoughtData) => {
        // if no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: "Thought not found." });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // DELETE/remove a thought by id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((dbThoughtData) => {
        // if no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: "Thought not found." });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  // DELETE/remove a reaction
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      // pull reaction's _id to the specific thought we want to update
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      // return the updated thought
      { new: true }
    )
      .then((dbThoughtData) => {
        // if no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: "Thought not found." });
          return;
        }

        res.json(dbThoughtData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};

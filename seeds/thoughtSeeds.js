const { Thought } = require("../models");

const thoughtData = [
  {
    thoughtText: "I love the new season of The Mandalorian!",
    username: "MrWilson30",
    reactions: [],
  },
  {
    thoughtText:
      "Coding is like eating an elephant. You have to do it one bite at a time.",
    username: "BFinny",
    reactions: [],
  },
  {
    thoughtText: "Who even sleeps anymore?",
    username: "JazzyJ",
    reactions: [], 
  }
];

const seedThoughts = () => Thought.insertMany(thoughtData);

module.exports = seedThoughts;

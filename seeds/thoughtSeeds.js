const { Thought } = require("../models");

const thoughtData = [
  {
    thoughts: ["I love the new season of The Mandalorian!", "I'm so excited to master REACT!"],
    username: "MrWilson84",
    reactions: ["I haven't watched it yet..."],
  },
  {
    thoughts:[
      "Coding is like eating an elephant. You have to do it one bite at a time."],
    username: "BFinny",
    reactions: ["I like elephants!"],
  },
  {
    thoughts: ["Who even sleeps anymore?"],
    username: "JazzyJ",
    reactions: ["I do!", "Often?", "Never!", "The weak! I'm a machine!"],
  }
];

const seedThoughts = () => Thought.insertMany(thoughtData);

module.exports = seedThoughts;

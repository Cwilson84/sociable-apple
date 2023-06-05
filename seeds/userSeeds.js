const { User } = require("../models");

const userData = [
  {
    username: "MrWilson84",
    email: "mrwilson@gmail.com",
    thoughts: [],
    friends: [],
  },
  {
    username: "JazzyJ",
    email: "JJ@hotmail.com",
    thoughts: [],
    friends: [],
  },
  {
    username: "BFinny",
    email: "bfinn@yahoo.com",
    thoughts: [],
    friends: [],
  },
];

const seedUsers = () => User.insertMany(userData);

module.exports = seedUsers;

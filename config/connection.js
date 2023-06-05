const mongoose = require("mongoose");
const MONGODB_URI =
  process.env.MONGODB_URI || "PORT 3001";

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;

db.on("error", (err) => {
  console.log(`There was an error connecting to the database: ${err}`);
  db.once("open", () => {
    console.log(`Successfully connected to MongoDB at: ${db.host}:${db.port}`);
  });
});

module.exports = db;
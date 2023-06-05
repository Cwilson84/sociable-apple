const seedUsers = require("./userSeeds");
const seedThoughts = require("./thoughtSeeds");
const db = require("../config/connection");

const seedAll = async () => {
  await db;

  await seedUsers();

  await seedThoughts();

  console.log("Seeding completed successfully!");

  process.exit(0);
};

seedAll();

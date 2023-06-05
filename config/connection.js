const { connect, connection } = require('mongoose');
require('dotenv').config();

const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/sociabe-apple';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

module.exports = connection;
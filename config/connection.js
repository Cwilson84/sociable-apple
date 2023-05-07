const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'PORT:3001';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;

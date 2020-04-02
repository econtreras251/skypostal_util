const MongoConnection = require('./mongoSingleton');
const {
  mongodbEnv: { host }
} = require('../../config');
const log = require('../helpers/log');
const { INFO } = require('../constants/log-levels');

const setupMongoDB = async () => {
  log('Setup mongoDB connection', INFO);
  await MongoConnection.getClient();
  log(`Enable connection with ${host}`, INFO);
  MongoConnection.closeConnection();
  process.exit(0);
};

module.exports = setupMongoDB;

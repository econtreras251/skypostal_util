const {
  mongodbEnv: { uri }
} = require('../../config');
const log = require('../helpers/log');
const { INFO } = require('../constants/log-levels');

const setupMongoDB = () => {
  log('Setup mongoDB connection', INFO);
  log(`Enable connection with ${uri}`, INFO);
};

module.exports = setupMongoDB;

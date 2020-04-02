const { MongoClient } = require('mongodb');
const {
  mongodbEnv: { host, dbName }
} = require('../../config');

const _mongodb = {};

const MongoConnection = {
  init: async () => {
    _mongodb.client = await MongoClient.connect(host, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return _mongodb.client;
  },
  getClient: async () => {
    if (!_mongodb.client) {
      await MongoConnection.init();
      return _mongodb.client;
    }
    return _mongodb.client;
  },
  getDb: async () => {
    const client = await MongoConnection.getClient();
    return client.db(dbName);
  },
  closeConnection: async () => {
    const client = await MongoConnection.getClient();
    client.close();
  }
};

Object.freeze(MongoConnection);
module.exports = MongoConnection;

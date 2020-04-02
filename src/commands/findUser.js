const { MongoError } = require('mongodb');
const MongoConnection = require('../setup/mongoSingleton');
const log = require('../helpers/log');
const { SUCCESS, INFO, ERROR, WARNING } = require('../constants/log-levels');

const findUser = async ci => {
  try {
    const puntoMioDb = await MongoConnection.getDb();
    log(`Search for user ${ci}`, INFO);
    const user = await puntoMioDb.collection('users').findOne({ id: ci });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    log(`User found ${JSON.stringify(user)}`, SUCCESS);
    MongoConnection.closeConnection();
    process.exit(0);
  } catch (err) {
    if (
      err instanceof MongoError &&
      err.message.slice(0, 'Invalid Operation'.length) === 'Invalid Operation'
    ) {
      log(`Invalid Operation Error ${err.message}`, WARNING);
    } else {
      log(`Error in find: ${err}`, ERROR);
    }
    process.exit(1);
  }
};

module.exports = findUser;

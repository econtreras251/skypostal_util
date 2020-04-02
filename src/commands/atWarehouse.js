const { customAlphabet: generate } = require('nanoid/async');
const { MongoError } = require('mongodb');
const MongoConnection = require('../setup/mongoSingleton');
const log = require('../helpers/log');
const { SUCCESS, INFO, ERROR, WARNING } = require('../constants/log-levels');

const generateTrackingNumber = async () =>
  parseInt(await generate('0123456789', 12)(), 10);

const atWarehouse = async externalTracking => {
  try {
    const trackingNumber = await generateTrackingNumber();
    const puntoMioDb = await MongoConnection.getDb();
    const collection = await puntoMioDb.collection('shipments');

    log(`Search for shipment ${externalTracking}`, INFO);
    log(`Generate tracking number ${trackingNumber}`, INFO);
    const shipment = await collection.findOne({ externalTracking });
    const event = {
      description: 'Paquete recibido en Miami',
      code: 'ALREC',
      visible: true,
      date: new Date()
    };

    await collection.updateOne(
      { _id: shipment._id },
      {
        $push: { events: event },
        $set: {
          trackingNumber,
          status: 'AT_WAREHOUSE',
          weight: 0.5,
          category: 'ATR',
          receivedInMiamiAt: new Date()
        }
      }
    );

    log('Shipment update correctly', SUCCESS);
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

module.exports = atWarehouse;

/*
  Skypostal event looks like this:

    content: string;
    externalTracking: string; -> this already exists, only use for "match" in ours system
    trackingNumber: number;
    value: number;
    weight: number;
    category: string;
*/

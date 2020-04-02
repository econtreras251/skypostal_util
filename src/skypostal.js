#! /usr/bin/env node

const skypostal = require('commander');
const { version } = require('../package');

// commands
const setup = require('./commands/setup');
const findUser = require('./commands/findUser');
const atWarehouse = require('./commands/atWarehouse');

skypostal.version(version);

skypostal
  .command('setup')
  .description('Check dependencies for others commands')
  .action(setup);

skypostal
  .command('findUser <ci>')
  .description('Find user by CI')
  .action(findUser);

skypostal
  .command('atWarehouse <externalTracking>')
  .description('Update state of shipment by external tracking')
  .action(atWarehouse);

skypostal.command('*').action(() => skypostal.help());

skypostal.parse(process.argv);

if (!process.argv.slice(2).length) {
  skypostal.help();
}

#! /usr/bin/env node

const skypostal = require('commander');
const { version } = require('../package');

// commands
const setup = require('./commands/setup');

skypostal
  .version(version);

skypostal
  .command('setup')
  .description('clone repository dependencies')
  .action(setup);

// skypostal
//   .command('game <ticketId>')
//   .description('create and deploy a new game reskin')
//   .action(game);

// skypostal
//   .command('template')
//   .description('release core files of template')
//   .option('-i, --id, [id]', 'what template to release')
//   .action(template);

skypostal
  .command('*')
  .action(() => skypostal.help());

skypostal.parse(process.argv);

if (!process.argv.slice(2).length) {
  skypostal.help();
}

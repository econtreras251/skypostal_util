const log = require('../helpers/log');
const { INFO, ERROR } = require('../constants/log-levels');

const buildSuggestMessage = (commands) =>
  `${
    commands.length > 1
      ? 'The mosts similar commands are:'
      : 'The most similar command is:'
  }

${commands.reduce(
    (suggestedCommands, command) => `${suggestedCommands}*  ${command.name()}\n`,
    ''
  )}
`;

const getSuggestsMessage = (commands, unknownOperation) => {
  const filteredCommands = commands.filter((cmd) => {
    const name = cmd.name().toLowerCase();
    return name.includes(unknownOperation.toLowerCase());
  });

  if (filteredCommands.length) {
    log(buildSuggestMessage(filteredCommands), INFO);
  }
};

const notFoundCommand = (unknownOperation, commands) => {
  log(
    `skypostal: '${unknownOperation}' is not a skypostal command. See 'skypostal --help'.`,
    ERROR
  );
  getSuggestsMessage(commands, unknownOperation);
  process.exit(1);
};

module.exports = notFoundCommand;

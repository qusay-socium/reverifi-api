/* eslint-disable no-console */

/**
 * Utility used to mange app migrations.
 */
const path = require('path');
const childProcess = require('child_process');
const Umzug = require('umzug');
const db = require('./models');

const umzug = new Umzug({
  migrations: {
    path: './src/migrations',
    pattern: /\.js$/,
    params: [
      db.sequelize.getQueryInterface(), // queryInterface
      db.sequelize.constructor, // DataTypes
      () => {
        throw new Error(
          // eslint-disable-next-line max-len
          'Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.'
        );
      },
    ],
  },
  storage: 'sequelize',
  storageOptions: { sequelize: db.sequelize },
  logging: (...args) => console.log.apply(null, args),
});

umzug.on('migrating', (name) => console.log(`${name} migrating`));
umzug.on('migrated', (name) => console.log(`${name} migrated`));
umzug.on('reverting', (name) => console.log(`${name} reverting`));
umzug.on('reverted', (name) => console.log(`${name} reverted`));

const logStatus = (pending, executed) => {
  console.log('---------');
  console.log(
    JSON.stringify(
      {
        current: executed.length > 0 ? executed[0].file : '<NO_MIGRATIONS>',
        executed: executed.map((m) => m.file),
        pending: pending.map((m) => m.file),
      },
      null,
      2
    )
  );
  console.log('---------');
};

/**
 * Print migrations status.
 */
const cmdStatus = async () => {
  const executed = (await umzug.executed()).map((migration) => ({
    ...migration,
    name: path.basename(migration.file, '.js'),
  }));

  const pending = (await umzug.pending()).map((migration) => ({
    ...migration,
    name: path.basename(migration.file, '.js'),
  }));

  logStatus(pending, executed);
  return { executed, pending };
};

/**
 * Apply all migrations.
 */
const cmdMigrate = () => umzug.up();

/**
 * Apply next migration.
 */
const cmdMigrateNext = async () => {
  const { pending } = await cmdStatus();
  if (pending.length === 0) {
    return Promise.reject(new Error('No pending migrations'));
  }
  return umzug.up({ to: pending[0].name });
};

/**
 * Undo all migrations.
 */
const cmdReset = () => umzug.down({ to: 0 });

/**
 * Undo previous migration.
 */
const cmdResetPrev = async () => {
  const { executed } = await cmdStatus();

  if (executed.length === 0) {
    return Promise.reject(new Error('Already at initial state'));
  }
  return umzug.down({ to: executed[executed.length - 1].name });
};

/**
 * Drop and recreate the database.
 */
const cmdHardReset = async () => {
  try {
    const { database, username } = db.sequelize.config;
    console.log(`dropdb ${database}`);
    childProcess.spawnSync(`dropdb ${database}`);
    console.log(`createdb ${database} --username ${username}`);
    childProcess.spawnSync(`createdb ${database} --username ${username}`);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

/**
 * Get command function.
 *
 * @param {string} cmd Command name.
 */
const getCommandFunc = (cmd) => {
  switch (cmd) {
    case 'status':
      return cmdStatus;

    case 'up':
    case 'migrate':
      return cmdMigrate;

    case 'next':
    case 'migrate-next':
      return cmdMigrateNext;

    case 'down':
    case 'reset':
      return cmdReset;

    case 'prev':
    case 'reset-prev':
      return cmdResetPrev;

    case 'reset-hard':
      return cmdHardReset;

    default:
      return null;
  }
};

/**
 * Run command.
 *
 * @param {string} cmd Command name.
 */
const runCommand = async (cmd) => {
  try {
    const func = getCommandFunc(cmd);
    if (!func) {
      console.log(`invalid cmd: ${cmd}`);
      process.exit(1);
    }

    console.log(`${cmd.toUpperCase()} BEGIN`);
    await func(process.argv.length > 3 ? process.argv[3].trim() : null);
    const doneStr = `${cmd.toUpperCase()} DONE`;
    console.log(doneStr);
    console.log('='.repeat(doneStr.length));

    if (cmd !== 'status' && cmd !== 'reset-hard') {
      cmdStatus();
    }
    process.exit(0);
  } catch (error) {
    const errorStr = `${cmd.toUpperCase()} ERROR`;
    console.log(errorStr);
    console.log('='.repeat(errorStr.length));
    console.log(error);
    console.log('='.repeat(errorStr.length));
    process.exit(1);
  }
};

runCommand(process.argv[2].trim());

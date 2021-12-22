require('dotenv').config();

const { start } = require('./src/server');

start(process.env.SERVER_PORT);

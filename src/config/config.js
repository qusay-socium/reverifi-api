require('dotenv').config();

const development = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: true,
};

const test = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  seederStorage: 'sequelize',
  seederStorageTableName: 'sequelize_data',
  logging: true,
};
const production = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  seederStorage: 'sequelize',
  seederStorageTableName: 'sequelize_data',
  logging: true,
};

const appConfig = {
  db: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  port: +process.env.SERVER_PORT || 3000,
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
  security: {
    password: {
      saltRounds: +process.env.PASSWORD_SALT_ROUNDS || 10,
      token: {
        expiry: +process.env.PASSWORD_ACCESS_TOKEN_EXPIRY || 14 * 24 * 60 * 60 * 1000,
      },
    },
    token: {
      expiry: process.env.ACCESS_TOKEN_EXPIRY,
      secret: process.env.ACCESS_TOKEN_SECRET,
      refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    },
  },
  connections: {
    rds: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      port: +process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      dialect: 'postgres',
      pool: {
        max: 20,
      },
      logging: process.env.NODE_ENV === 'dev',
    },
  },
};

const statusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_ALLOWED: 405,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = { appConfig, production, statusCode, development, test };

const { CORS_ORIGIN, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME, NODE_ENV, PORT, SECRET } =
  process.env;

const config = {
  corsOrigin: CORS_ORIGIN || '*',
  dbHost: DB_HOST,
  dbName: DB_NAME,
  dbPassword: DB_PASSWORD,
  dbPort: DB_PORT,
  dbUsername: DB_USERNAME,
  nodeEnv: NODE_ENV,
  port: Number.parseInt(PORT || '3000', 10),
  secret: SECRET,
};

module.exports = config;

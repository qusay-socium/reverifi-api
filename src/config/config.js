export const dev = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  dialect: 'postgres',
  seederStorage: 'sequelize',
  seederStorageTableName: 'sequelize_data',
  logging: true,
};
export const test = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  dialect: 'postgres',
  seederStorage: 'sequelize',
  seederStorageTableName: 'sequelize_data',
  logging: true,
};
export const production = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  dialect: 'postgres',
  seederStorage: 'sequelize',
  seederStorageTableName: 'sequelize_data',
  logging: true,
};

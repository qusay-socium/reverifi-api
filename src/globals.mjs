import config from './config';

global.AppConfigs = config;
global.Logger = process.env.NODE_ENV === 'test' ? { info: () => {}, error: () => {} } : console;

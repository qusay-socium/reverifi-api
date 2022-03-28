const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { secret } = require('config/config');

// TODO: move the hardcoded strings to env vars
const algorithm = 'aes-192-cbc';
const hashSalt = 'hash-salt';
const key = crypto.scryptSync('bncaskdbvasbvlaslslasfhj', 'REVERIFY', 24);
const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  return Buffer.concat([cipher.update(text), cipher.final()]).toString('hex');
};

const decrypt = (text) => {
  try {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    return Buffer.concat([decipher.update(Buffer.from(text, 'hex')), decipher.final()]).toString();
  } catch (error) {
    throw new Error('invalid text');
  }
};

const hash = (password) => crypto.scryptSync(password, hashSalt, 32).toString('hex');

const getJwtToken = (data, expiry = undefined) =>
  jwt.sign(data, secret, expiry ? { expiresIn: expiry } : undefined);

const verifyJwtToken = (token) => {
  try {
    jwt.verify(token, secret, { ignoreExpiration: false });
    return true;
  } catch (error) {
    return false;
  }
};

const decodeJwtToken = (token) => jwt.decode(token);

module.exports = {
  encrypt,
  decrypt,
  hash,
  getJwtToken,
  verifyJwtToken,
  decodeJwtToken,
};

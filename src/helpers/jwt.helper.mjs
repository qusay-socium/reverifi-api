import jsonWebToken from 'jsonwebtoken';

export const jwtHelper = {
  sign: async claim =>
    Promise.all([
      jsonWebToken.sign(claim, AppConfigs.security.token.secret, { expiresIn: AppConfigs.security.token.expiry }),
      jsonWebToken.sign(claim, AppConfigs.security.token.refreshTokenSecret),
    ]),
  verify: async token => jsonWebToken.verify(token, AppConfigs.security.token.secret),
  verifyRefreshToken: async token => jsonWebToken.verify(token, AppConfigs.security.token.refreshTokenSecret),
};

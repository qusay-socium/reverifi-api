import bcrypt from 'bcryptjs';
// import crypto from 'crypto';

export const PasswordHelper = {
  hash: async password => {
    const salt = await bcrypt.genSalt(AppConfigs.security.password.saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  },
  verify: async (userPassword, hash) => bcrypt.compare(userPassword, hash),
};

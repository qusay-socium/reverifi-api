const { twilioAccountSid, twilioAuthToken, smsSender } = require('config/config');
const Twilio = require('twilio');

let client;

if (twilioAccountSid && twilioAuthToken) {
  client = new Twilio(twilioAccountSid, twilioAuthToken);
}

/**
 * Send SMS message.
 *
 * @param {string} to The destination phone number.
 * @param {string} body The text of the message.
 *
 * @return {Promise<import('twilio/lib/rest/api/V2010/account/message').MessageInstance>}
 */
const send = async (to, body) => {
  if (!client) {
    throw new Error('Twilio environment variables are not set');
  }
  return client.messages.create({ body, to, from: smsSender });
};

module.exports = send;

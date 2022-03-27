const nodemailer = require('nodemailer');
const { smtpHost, smtpPort, smtpUser, smtpPassword, emailSender } = require('config/config');

const transport = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  auth: { user: smtpUser, pass: smtpPassword },
});

/**
 * Send email.
 *
 * @param {string} to The recipients email addresses.
 * @param {string} body The email HTML content.
 * @param {string} subject The subject of the e-mail.
 */
const send = async (to, body, subject) =>
  transport.sendMail({
    from: emailSender,
    to,
    subject,
    html: body,
  });

module.exports = send;

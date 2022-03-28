const {
  BASE_URL,
  CORS_ORIGIN,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
  GCLOUD_PROJECT,
  GCLOUD_STORAGE_BUCKET,
  GOOGLE_APPLICATION_CREDENTIALS,
  NODE_ENV,
  NOTIFICATION_EMAIL_SENDER,
  NOTIFICATION_SMS_SENDER,
  PORT,
  SECRET,
  SMTP_HOST,
  SMTP_PASSWORD,
  SMTP_PORT,
  SMTP_USER,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
} = process.env;

const config = {
  baseUrl: BASE_URL,
  corsOrigin: CORS_ORIGIN || '*',
  dbHost: DB_HOST,
  dbName: DB_NAME,
  dbPassword: DB_PASSWORD,
  dbPort: DB_PORT,
  dbUsername: DB_USERNAME,
  emailSender: NOTIFICATION_EMAIL_SENDER,
  nodeEnv: NODE_ENV,
  port: Number.parseInt(PORT || '3000', 10),
  secret: SECRET,
  GCLOUD_STORAGE_BUCKET,
  GCLOUD_PROJECT,
  GOOGLE_APPLICATION_CREDENTIALS,
  smsSender: NOTIFICATION_SMS_SENDER,
  smtpHost: SMTP_HOST,
  smtpPassword: SMTP_PASSWORD,
  smtpPort: SMTP_PORT,
  smtpUser: SMTP_USER,
  twilioAccountSid: TWILIO_ACCOUNT_SID,
  twilioAuthToken: TWILIO_AUTH_TOKEN,
};

module.exports = config;

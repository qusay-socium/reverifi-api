const { Notification } = require('models');
const { notificationStatus } = require('notifications/enums');
const { renderView } = require('notifications/utils');
const { email, sms, push } = require('notifications/channels');

const channelsPublisher = {
  Email: { send: email, toField: 'email' },
  Sms: { send: sms, toField: 'phone' },
  Push: { send: push, toField: 'id' },
};

/**
 * Publish notification.
 *
 * @param {Object} data The Notification object.
 */
const publishNotification = async (notification) => {
  try {
    const {
      user,
      notificationChannel: {
        view,
        title,
        channel: { name: channelName },
      },
    } = notification;
    const publisher = channelsPublisher[channelName];

    if (!publisher) {
      throw new Error(`No publisher defined for ${channelName} channel`);
    }

    const content = await renderView(view, notification.content);
    const titleContent = title ? await renderView(title, notification.content) : null;

    await publisher.send(user[publisher.toField], content, titleContent);
    await Notification.updateOne(notification.id, { status: notificationStatus.sent });
  } catch (error) {
    await Notification.updateOne(notification.id, {
      status: notificationStatus.failed,
      retries: (notification.retries || 0) + 1,
      responseMessage: error.message,
    });
  }
};

/**
 * Publish all pending notifications.
 *
 * @param {Object} data The Notification object.
 */
const publishPendingNotifications = async () => {
  const notifications = await Notification.getAllWithUserAndChannel({
    status: notificationStatus.pending,
  });
  const data = await Promise.all(
    notifications.map(async (notification) => publishNotification(notification))
  );
  return data;
};

module.exports = {
  publishPendingNotifications,
};

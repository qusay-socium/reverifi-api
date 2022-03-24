const { BadRequest } = require('lib/errors');
const models = require('models');
const { addNotificationValidator } = require('notifications/validators');
const { notificationStatus } = require('notifications/enums');
const { renderView } = require('notifications/utils');

const { Notification, NotificationType, User } = models;

/**
 * Get the content data for notification using the provided params.
 *
 * @param {Object} content Notification channel content object.
 * @param {Object} params The params object.
 *
 * @return  {Promise<Object>} Object contains the content data for notification.
 */
const getNotificationContent = async (content, params) => {
  const data = {};
  await Promise.all(
    Object.entries(content || {}).map(async ([key, { model, fields }]) => {
      // TODO: validate that type of params value match the column type
      const modelData = await models[model].getOne(params[key]);

      (Array.isArray(fields)
        ? fields.map((field) => [field, field])
        : Object.entries(fields)
      ).forEach(([field, fieldName]) => {
        data[fieldName] = modelData[field];
      });
    })
  );

  return data;
};

/**
 * Get the content data for all notification channels using the provided params.
 *
 * @param {Object[]} notificationChannels Array of notification channels objects.
 * @param {Object} params The params object.
 *
 * @return  {Promise<Object>} Object contains the data for each notification channel,
 *                            The kys are notification channel IDs and the value is the content for the notification.
 */
const getNotificationChannelsContent = async (notificationChannels, params) => {
  const content = {};

  await Promise.all(
    notificationChannels.map((nc) =>
      getNotificationContent(nc.content, params).then((data) => {
        content[nc.id] = data;
      })
    )
  );

  return content;
};

/**
 * Create new notification.
 *
 * @param {Object} data Notification data.
 *
 * @return {Promise<Object>} The created notification.
 */
const addNotification = async (data) => {
  await addNotificationValidator(data);
  const { userId, notificationTypeId, params } = data;

  const user = await User.getOne(userId);
  if (!user) {
    throw new BadRequest(`No user with id ${userId} is defined`);
  }

  const notificationType = await NotificationType.getOne(notificationTypeId, {
    include: ['notificationChannels'],
  });
  if (!notificationType) {
    throw new BadRequest(`No notification type with id ${notificationTypeId} is defined`);
  }

  const { notificationChannels } = notificationType;
  if (notificationChannels.length === 0) {
    throw new BadRequest(`The notification type is not related to any channel`);
  }
  const notificationParams = [
    ...new Set(notificationChannels.map((nc) => Object.keys(nc.content || {})).flat()),
  ];

  const paramsKeys = Object.entries(params)
    .filter(([, value]) => !!value)
    .map(([key]) => key);

  const missingParams = notificationParams.filter((p) => !paramsKeys.includes(p));
  if (missingParams.length > 0) {
    throw new BadRequest(`(${missingParams.join(',')}) are required for this notification`);
  }

  const contentData = await getNotificationChannelsContent(notificationChannels, params);

  const notifications = await Notification.createAll(
    notificationChannels.map((nc) => ({
      notificationChannelId: nc.id,
      sentTo: user.id,
      content: contentData[nc.id],
      status: notificationStatus.pending,
    }))
  );
  return notifications;
};

/**
 * Render notification.
 *
 * @param {string} is The Notification ID.
 *
 * @return {Promise<string>} The rendered notification text.
 */
const renderNotification = async (id) => {
  const notification = await Notification.getOne(id, { include: ['notificationChannel'] });
  if (!notification) {
    throw new BadRequest(`No notification with id ${id} is defined`);
  }

  const content = await renderView(notification.notificationChannel.view, notification.content);
  return content;
};

/**
 * Render notification title.
 *
 * @param {string} is The Notification ID.
 *
 * @return {Promise<string>} The rendered notification title text.
 */
const renderNotificationTitle = async (id) => {
  const notification = await Notification.getOne(id, { include: ['notificationChannel'] });
  if (!notification) {
    throw new BadRequest(`No notification with id ${id} is defined`);
  }
  if (!notification.notificationChannel.title) {
    return null;
  }
  const content = await renderView(notification.notificationChannel.title, notification.content);
  return content;
};

module.exports = {
  addNotification,
  renderNotification,
  renderNotificationTitle,
};

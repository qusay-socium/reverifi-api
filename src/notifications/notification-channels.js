const { BadRequest, NotFound } = require('lib/errors');
const { NotificationChannels, NotificationType, Channel } = require('models');
const { parseContent, isViewExists, isViewFile } = require('notifications/utils');

const {
  createNotificationChannelsValidator,
  updateNotificationChannelsValidator,
  notificationChannelsContentValidator,
} = require('notifications/validators');

/**
 * Create new notification channel.
 *
 * @param {Object} data Notification channel data.
 *
 * @return {Promise<Object>} The created notification channel.
 */
const addNotificationChannels = async (data) => {
  await createNotificationChannelsValidator(data);

  data.content = parseContent(data.content);
  notificationChannelsContentValidator(data.content);

  if (isViewFile(data.view)) {
    const viewExists = await isViewExists(data.view);
    if (!viewExists) {
      throw new BadRequest('View file not exists');
    }
  }

  if (isViewFile(data.title)) {
    const viewExists = await isViewExists(data.title);
    if (!viewExists) {
      throw new BadRequest('Title file not exists');
    }
  }

  const notificationType = await NotificationType.getOne(data.notificationTypeId);
  if (!notificationType) {
    throw new BadRequest(`No notification type with id ${data.notificationTypeId} is defined`);
  }

  const channel = await Channel.getOne(data.channelId);
  if (!channel) {
    throw new BadRequest(`No channel with id ${data.channelId} is defined`);
  }

  const isExists = await NotificationChannels.getOneByCondition({
    notificationTypeId: data.notificationTypeId,
    channelId: data.channelId,
  });

  if (isExists) {
    throw new BadRequest('A record for this type and channel already exists');
  }

  const notificationChannels = await NotificationChannels.createOne(data);

  return notificationChannels;
};

/**
 * Update existing notification channel.
 *
 * @param {string} id Notification channel ID.
 * @param {Object} data Notification channel data.
 *
 * @return {Promise<Object>} The updated notification channel.
 */
const updateNotificationChannels = async (id, data) => {
  await updateNotificationChannelsValidator(data);

  if (Object.prototype.hasOwnProperty.call(data, 'content')) {
    data.content = parseContent(data.content);
    notificationChannelsContentValidator(data.content);
  }

  if (isViewFile(data.view)) {
    const viewExists = await isViewExists(data.view);
    if (!viewExists) {
      throw new BadRequest('View file not exists');
    }
  }

  if (isViewFile(data.title)) {
    const viewExists = await isViewExists(data.title);
    if (!viewExists) {
      throw new BadRequest('Title file not exists');
    }
  }

  // TODO: Check if notification type or channel updated.
  const notificationChannels = await NotificationChannels.updateOne(id, data);
  if (!notificationChannels) {
    throw new NotFound('Data not found');
  }
  return notificationChannels;
};

module.exports = {
  addNotificationChannels,
  updateNotificationChannels,
};

const Router = require('express-promise-router');
const { apiGetPage, apiGet, apiDelete } = require('middleware/api-methods');
const { NotificationChannels } = require('models');
const {
  addNotificationChannels,
  updateNotificationChannels,
} = require('notifications/notification-channels');
const response = require('utils/response');

const router = Router({ mergeParams: true });

router.get('/', apiGetPage(NotificationChannels));

/**
 * Handle GET to /api/notification-channels/:id route.
 */
router.get('/:id', apiGet(NotificationChannels));

/**
 * Handle POST to /api/notification-channels route.
 */
router.post('/', async (req, res) => {
  const data = await addNotificationChannels(req.body);
  res.json(response({ data }));
});

/**
 * Handle PATCH to /api/notification-channels route.
 */
router.patch('/:id', async (req, res) => {
  const data = await updateNotificationChannels(req.params.id, req.body);
  res.json(response({ data }));
});

// TODO: Implement NotificationChannels delete with validations.
/**
 * Handle DELETE to /api/notification-channels/:id route.
 */
router.delete('/:id', apiDelete(NotificationChannels));

module.exports = router;

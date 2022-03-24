const Router = require('express-promise-router');
const {
  addNotification,
  renderNotification,
  renderNotificationTitle,
} = require('notifications/notifications');
const { publishPendingNotifications } = require('notifications/publisher');

const response = require('utils/response');

const router = Router({ mergeParams: true });

/**
 * Handle GET to /api/notifications/id/title route.
 */
router.get('/:id/title', async (req, res) => {
  const data = await renderNotificationTitle(req.params.id);
  res.send(data);
});

/**
 * Handle GET to /api/notifications/:id route.
 */
router.get('/:id', async (req, res) => {
  const data = await renderNotification(req.params.id);
  res.send(data);
});

/**
 * Handle POST to /api/notifications route.
 */
router.post('/publish-pending', async (req, res) => {
  const data = await publishPendingNotifications();
  res.json(response({ data }));
});

/**
 * Handle POST to /api/notifications route.
 */
router.post('/', async (req, res) => {
  const data = await addNotification(req.body);
  res.json(response({ data }));
});

module.exports = router;

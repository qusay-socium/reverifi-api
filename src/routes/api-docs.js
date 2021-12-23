const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const Router = require('express-promise-router');

const router = Router();

/**
 * Serve swaggerUi static files.
 */
router.use('/', swaggerUi.serve);

/**
 * Handle GET to /api-docs route.
 */
router.get('/', swaggerUi.setup(YAML.load('./src/swagger.yml')));

module.exports = router;

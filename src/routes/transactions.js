const {
  getProcessesAssignee,
  updateProcessesStatus,
  getTransactions,
  getTransactionsAssignees,
  updateTransaction,
  getAssignees,
} = require('controllers/transaction');
const Router = require('express-promise-router');

const auth = require('middleware/auth');

const router = Router({ mergeParams: true });

/**
 * Handle GET to /api/transactions/processes/:transactionId route.
 */
router.get('/processes/:transactionId', auth, getProcessesAssignee);

/**
 * Handle PATCH to /api/transactions/processes route.
 */
router.patch('/processes', auth, updateProcessesStatus);

/**
 * Handle GET to /api/transactions route.
 */
router.get('/', auth, getTransactions);

/**
 * Handle GET to /api/transactions/assignees route.
 */
router.get('/assignees', auth, getTransactionsAssignees);

/**
 * Handle PATCH to /api/transactions/ route.
 */
router.patch('/', auth, updateTransaction);

/**
 * Handle GET to /api/transactions/assignees/:transactionId route.
 */
router.get('/assignees/:transactionId', auth, getAssignees);

module.exports = router;

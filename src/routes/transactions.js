const {
  updateProcessesStatus,
  getTransactions,
  getTransactionsAssignees,
  updateTransaction,
  addTransaction,
  getWorkflowStep,
  addParties,
  addNotes,
  getAssignees,
  addProcesses,
  getNotes,
  getProcessesAssignee,
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
 * Handle POST to /api/transactions/processes route.
 */
router.post('/processes', auth, addProcesses);

/**
 * Handle POST to /api/transactions/add-parties route.
 */
router.post('/add-parties', auth, addParties);

/**
 * Handle GET to /api/transactions/assignees/:transactionId route.
 */
router.get('/assignees/:transactionId', auth, getAssignees);

/**
 * Handle GET to /api/transactions/assignees route.
 */
router.get('/assignees', auth, getTransactionsAssignees);

/*
 * Handle GET to /api/transactions/notes route.
 */
router.get('/notes/:transactionId', auth, getNotes);

/**
 * Handle POST to /api/transactions/notes route.
 */
router.post('/notes', auth, addNotes);

/**
 * Handle GET to /api/transactions/workflow-step/:number route.
 */
router.get('/workflow-step/:number', auth, getWorkflowStep);

/**
 * Handle POST to /api/transactions route.
 */
router.post('/', auth, addTransaction);

/**
 * Handle PATCH to /api/transactions/ route.
 */
router.patch('/', auth, updateTransaction);

/**
 * Handle GET to /api/transactions route.
 */
router.get('/', auth, getTransactions);

module.exports = router;

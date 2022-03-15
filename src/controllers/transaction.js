const {
  TransactionProcesses,
  Processes,
  TransactionAssignee,
  User,
  Transactions,
  Listing,
  Roles,
} = require('models');
const response = require('utils/response');

/**
 * get all processes assignee.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getProcessesAssignee = async (req, res) => {
  const { transactionId } = req.params;

  const data = await TransactionProcesses.getAllByCondition(
    { transactionId },
    {
      include: [
        {
          model: TransactionAssignee,
          as: 'assignee',
          include: [{ model: User, as: 'assignedUser' }],
        },
        {
          model: Processes,
          as: 'process',
          attributes: ['name', 'id', 'stateId'],
        },
      ],
    }
  );

  res.json(response({ data }));
};

/**
 * get all transactions.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getTransactions = async (req, res) => {
  const { id } = req.user;

  const data = await Transactions.getAllByCondition(
    { createdBy: id },
    {
      include: [
        {
          model: Listing,
          as: 'transactionListing',
          include: [{ model: User, as: 'agent', include: [{ model: Roles, as: 'roles' }] }],
        },
      ],
    }
  );

  res.json(response({ data }));
};

/**
 * get all transactions for one assignee.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getTransactionsAssignees = async (req, res) => {
  const { id } = req.user;

  const data = await TransactionAssignee.getAllByCondition(
    { userId: id },
    {
      include: [
        {
          model: Transactions,
          as: 'assignedTransaction',
          include: [{ model: Listing, as: 'transactionListing' }],
        },
      ],
    }
  );

  res.json(response({ data }));
};

/**
 * update process status.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const updateProcessesStatus = async (req, res) => {
  const { id, value } = req.body;

  await TransactionProcesses.updateOne(id, { isCompleted: value });

  res.json(response());
};

/**
 * update Transaction status.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const updateTransaction = async (req, res) => {
  const { transactionId, status } = req.body;

  await Transactions.updateOne(transactionId, { status });

  res.json(response());
};

/**
 * get transaction assignees
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getAssignees = async (req, res) => {
  const { transactionId } = req.params;

  const data = await TransactionAssignee.getAllByCondition(
    { transactionId },
    { include: [{ model: User, as: 'assignedUser' }] }
  );

  res.json(response({ data }));
};

module.exports = {
  getProcessesAssignee,
  updateProcessesStatus,
  getTransactions,
  getTransactionsAssignees,
  updateTransaction,
  getAssignees,
};

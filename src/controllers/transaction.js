const { NotFound } = require('lib/errors');
const {
  TransactionProcesses,
  Listing,
  Roles,
  TransactionWorkflowSteps,
  Transactions,
  TransactionAssignee,
  TransactionsNotes,
  User,
  Processes,
  Sequelize,
  DocumentsNames,
  Documents,
} = require('models');
const { updateOne } = require('models/base-model');
const response = require('utils/response');

/**
 * get transaction step
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getWorkflowStep = async (req, res) => {
  const { number } = req.params;

  const data = await TransactionWorkflowSteps.getOneByCondition({ stepNumber: number });

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
        {
          model: TransactionWorkflowSteps,
          as: 'workflowStep',
        },
      ],
    }
  );

  res.json(response({ data }));
};

/**
 * add or update transaction
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const addTransaction = async (req, res) => {
  const { listingId, workflowStepId } = req.body;
  const createdBy = req.user.id;

  const exist = await Transactions.getOneByCondition({ listingId, createdBy });

  let data;

  if (!exist) {
    data = await Transactions.createOne({ listingId, workflowStepId, createdBy });
  } else {
    data = await Transactions.updateOne(exist.id, { workflowStepId });
  }

  res.json(response({ data }));
};

/**
 * add transaction parties
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const addParties = async (req, res) => {
  const { userIdsAndRoles, transactionId } = req.body;

  const transactionExist = await TransactionAssignee.getOneByCondition({ transactionId });

  if (transactionExist) {
    // to update transaction users
    await Promise.all(
      userIdsAndRoles.map(async ({ role }) => {
        await TransactionAssignee.deleteByCondition({ transactionId, role });
      })
    );
  }

  let data;

  if (userIdsAndRoles.length) {
    data = await TransactionAssignee.createAll(
      userIdsAndRoles.map(({ invitedUserId, role }) => ({
        userId: invitedUserId,
        role,
        transactionId,
      }))
    );
  }

  res.json(response({ data }));
};

/**
 * add or update transaction notes
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const addNotes = async (req, res) => {
  const { notes, transactionId, workflowStepId } = req.body;

  const exist = await TransactionsNotes.getOneByCondition({ transactionId, workflowStepId });

  let data;

  if (!exist) {
    data = await TransactionsNotes.createOne({ notes, transactionId, workflowStepId });
  } else {
    data = await TransactionsNotes.updateOne(exist.id, { notes });
  }

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
          include: [
            { model: Listing, as: 'transactionListing' },
            {
              model: TransactionWorkflowSteps,
              as: 'workflowStep',
            },
          ],
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
 * add or update transaction processes
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const addProcesses = async (req, res) => {
  const { usersData, transactionId } = req.body;

  const exist = TransactionProcesses.getOneByCondition({
    transactionId,
  });

  if (exist) {
    await TransactionProcesses.deleteByCondition({ transactionId });
  }

  if (usersData.length) {
    await TransactionProcesses.createAll(
      usersData.map(({ assigneeId, dueDate, processId }) => ({
        assigneeId,
        dueDate,
        processId,
        transactionId,
      }))
    );
  }

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
 * get transaction note
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getNotes = async (req, res) => {
  const { transactionId } = req.params;
  const { workflowStepId } = req.query;

  const data = await TransactionsNotes.getOneByCondition({ transactionId, workflowStepId });

  res.json(response({ data }));
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
      order: [[Sequelize.literal('"process.name"'), 'ASC']],
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
 * get all documents names
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getDocumentsNames = async (req, res) => {
  const data = await DocumentsNames.getAll();

  res.json(response({ data }));
};

/**
 * add document
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const addDocument = async (req, res) => {
  const { transactionId, documentNameId, documentUrl } = req.body;
  const createdBy = req.user.id;

  const exist = await Documents.getOneByCondition({ transactionId, documentNameId, createdBy });

  let data;

  if (!exist) {
    data = await Documents.createOne({ createdBy, transactionId, documentNameId, documentUrl });
  } else {
    data = updateOne(exist.id, { documentNameId, documentUrl });
  }

  res.json(response({ data }));
};

/**
 * get all documents
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getDocuments = async (req, res) => {
  const { transactionId } = req.params;

  const data = await Documents.getAllByCondition(
    { transactionId },
    { include: [{ model: User, as: 'documentUser' }] }
  );

  res.json(response({ data }));
};

/**
 * delete document
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const deleteDocument = async (req, res) => {
  const { id } = req.params;

  const valid = await Documents.deleteByCondition({ id });
  if (!valid) {
    throw new NotFound();
  }

  res.json(response());
};

module.exports = {
  updateProcessesStatus,
  getTransactions,
  getTransactionsAssignees,
  updateTransaction,
  getAssignees,
  addTransaction,
  getWorkflowStep,
  addParties,
  addNotes,
  addProcesses,
  getNotes,
  getProcessesAssignee,
  getDocumentsNames,
  addDocument,
  getDocuments,
  deleteDocument,
};

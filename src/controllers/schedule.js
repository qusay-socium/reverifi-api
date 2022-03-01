const { Schedule, ScheduleVisit } = require('models');
const { NotFound } = require('lib/errors');
const response = require('utils/response');

/**
 * Create or update listing schedule.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const createListingSchedule = async (req, res) => {
  const data = req.body;
  const schedule = await Schedule.getOneByCondition({ listingId: data.listingId });

  const scheduleData = schedule
    ? await Schedule.updateByCondition({ listingId: data.listingId }, data)
    : await Schedule.createOne(data, { listingId: data.listingId });

  res.json(response({ data: scheduleData }));
};

/**
 * Create listing schedule.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const createVisitListing = async (req, res) => {
  const data = req.body;
  const userId = req.user.id;

  const visitTime = await ScheduleVisit.createOne({ ...data, userId });

  res.json(response({ data: visitTime }));
};

/**
 * Get schedule listing by ID.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getListingSchedule = async (req, res) => {
  const { id } = req.params;
  const data = await Schedule.getOneByCondition({ listingId: id });

  if (!data) {
    throw new NotFound();
  }

  res.json(response({ data }));
};

module.exports = {
  createListingSchedule,
  createVisitListing,
  getListingSchedule,
};

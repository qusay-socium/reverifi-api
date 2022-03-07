const { Reviews, User, UserInfo, ReviewRatings, RatingCriteria, Sequelize } = require('models');
const response = require('utils/response');

/**
 * get reviews by id.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const getReviews = async (req, res) => {
  const userId = req.params.id;

  const data = await Reviews.getAllByCondition(
    { userId },
    {
      order: [
        ['created_at', 'DESC'],
        [Sequelize.literal('"ratings.criteria"'), 'ASC'],
      ],
      include: [
        {
          model: User,
          as: 'reviewer',
          attributes: { exclude: ['password'] },
          include: [{ model: UserInfo, as: 'userInfo', attributes: ['image'] }],
        },
        {
          model: RatingCriteria,
          as: 'ratings',
          attributes: ['id', 'criteria'],
          through: { attributes: [] },
        },
      ],
    }
  );

  res.json(response({ data }));
};

/**
 * Add user review.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const addReview = async (req, res) => {
  const { userId, review, selectedCriteria } = req.body;
  const reviewerId = req.user.id;

  const newReview = await Reviews.createOne({ userId, reviewerId, review });

  if (selectedCriteria.length) {
    await ReviewRatings.createAll(
      selectedCriteria.map((ratingId) => ({
        ratingCriteriaId: ratingId,
        reviewId: newReview.id,
      }))
    );
  }

  res.json(response());
};

/**
 * update user review.
 *
 * @param {import('express').Request} req Express request object.
 * @param {import('express').Response} res Express response object.
 */
const updateReview = async (req, res) => {
  const { review, selectedCriteria, reviewId } = req.body;

  await Reviews.updateOne(reviewId, { review });

  if (selectedCriteria) {
    await ReviewRatings.destroy({
      where: { reviewId },
    });

    await ReviewRatings.createAll(
      selectedCriteria.map((ratingId) => ({
        ratingCriteriaId: ratingId,
        reviewId,
      }))
    );
  }
  res.json(response());
};

module.exports = {
  addReview,
  updateReview,
  getReviews,
};

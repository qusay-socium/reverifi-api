const { checkSchema } = require('express-validator');
const models = require('models');
const { BadRequest } = require('lib/errors');

const getValidator = (schema) => async (data) => {
  const results = await schema.run({ body: data });
  const errors = results.map((res) => res.errors).flat();

  if (errors.length > 0) {
    throw new BadRequest(
      'Bad request',
      errors.map(({ msg, param }) => ({ message: msg, param }))
    );
  }
};

const getStringFieldValidator = (
  name,
  isOptional = false,
  extraValidators = {},
  isOptionalNullable = false
) => ({
  [name]: {
    notEmpty: {
      bail: true,
      errorMessage: `${name} ${isOptional ? 'cant be empty' : 'is required'}`,
    },
    isString: { bail: true, errorMessage: `${name} must be a string` },
    ...(isOptional
      ? { optional: isOptionalNullable ? { options: { nullable: true } } : true }
      : {}),
    ...(extraValidators || {}),
  },
});

const createNotificationChannelsValidator = getValidator(
  checkSchema(
    {
      ...getStringFieldValidator('notificationTypeId', false, {
        isUUID: { bail: true, errorMessage: 'notificationTypeId must be a valid UUID' },
      }),
      ...getStringFieldValidator('channelId', false, {
        isUUID: { bail: true, errorMessage: 'notificationTypeId must be a valid UUID' },
      }),
      ...getStringFieldValidator('view'),
      ...getStringFieldValidator('title', true, {}, true),
      content: {
        exists: { bail: true, errorMessage: 'content is required' },
        isObject: { bail: true, errorMessage: 'content must be an object' },
      },
    },
    ['body']
  )
);

const updateNotificationChannelsValidator = getValidator(
  checkSchema(
    {
      ...getStringFieldValidator('notificationTypeId', true, {
        isUUID: { bail: true, errorMessage: 'notificationTypeId must be a valid UUID' },
      }),
      ...getStringFieldValidator('channelId', true, {
        isUUID: { bail: true, errorMessage: 'notificationTypeId must be a valid UUID' },
      }),
      ...getStringFieldValidator('view', true, {}),
      ...getStringFieldValidator('title', true, {}, true),
      content: {
        exists: { bail: true, errorMessage: 'content is required' },
        isObject: { bail: true, errorMessage: 'content must be an object' },
      },
    },
    ['body']
  )
);

const addNotificationValidator = getValidator(
  checkSchema(
    {
      ...getStringFieldValidator('userId', false, {
        isUUID: { bail: true, errorMessage: 'userId must be a valid UUID' },
      }),
      ...getStringFieldValidator('notificationTypeId', false, {
        isUUID: { bail: true, errorMessage: 'notificationTypeId must be a valid UUID' },
      }),
      params: {
        exists: { bail: true, errorMessage: 'params is required' },
        isObject: { bail: true, errorMessage: 'params must be an object' },
      },
    },
    ['body']
  )
);

const validateContentFiled = (filed) => {
  const { model, fields } = filed || {};
  const errors = {};

  if (
    !fields ||
    (Array.isArray(fields) && fields.length === 0) ||
    Object.keys(fields).length === 0
  ) {
    errors.fields = 'The fields cant be empty';
  }
  if (!model) {
    errors.model = 'The model is required';
  }

  if (!models[model]) {
    errors.model = `${model} is not a DB model`;
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const modelAttributes = Object.keys(models[model].getAttributes());

  const invalidAttributes = (Array.isArray(fields) ? fields : Object.keys(fields)).filter(
    (attr) => !modelAttributes.includes(attr)
  );

  if (invalidAttributes.length > 0) {
    return { fields: `(${invalidAttributes.join(',')}) are not exist in the ${model} model` };
  }
  return null;
};

const notificationChannelsContentValidator = (content) => {
  const errors = {};
  Object.keys(content).forEach((key) => {
    const filedErrors = validateContentFiled(content[key]);
    if (filedErrors) {
      errors[key] = filedErrors;
    }
  });

  if (Object.keys(errors).length > 0) {
    throw new BadRequest('Invalid content', errors);
  }
};

module.exports = {
  createNotificationChannelsValidator,
  updateNotificationChannelsValidator,
  notificationChannelsContentValidator,
  addNotificationValidator,
};

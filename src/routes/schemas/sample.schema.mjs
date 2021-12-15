import Joi from 'joi';

export const SampleRouteSchema = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};

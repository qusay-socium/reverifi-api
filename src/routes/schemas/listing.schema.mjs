import Joi from 'joi';

export const ListingRouteSchema = {
  body: Joi.object({
    images: Joi.array().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    address: Joi.object().required(),
  }),
  query: Joi.object({
    location: Joi.string(),
    price: Joi.number(),
  }),
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

export const ListingRouteUpdateSchema = {
  body: Joi.object({
    images: Joi.array(),
    price: Joi.number(),
    description: Joi.string(),
    address: Joi.object(),
  }),
};

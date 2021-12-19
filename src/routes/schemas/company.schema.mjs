import Joi from 'joi';

export const CompanyRouteSchema = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    website: Joi.string(),
    address: Joi.object(),
  }),
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

export const CompanyUpdateRouteSchema = {
  body: Joi.object()
    .keys({
      name: Joi.string(),
      website: Joi.string(),
      address: Joi.object(),
      email: Joi.string(),
    })
    .or('name', 'website', 'address', 'email'),
};

export const CompanyFilterRouteSchema = {
  query: Joi.object({
    limit: Joi.string(),
  }),
};

import Joi from 'joi';

export const UserInfoRouteSchema = {
  body: Joi.object({
    address: Joi.object().required(),
    website: Joi.string().required(),
    languages: Joi.array().required(),
    serviceAreas: Joi.array().required(),
    socials: Joi.object(),
    aboutMe: Joi.string(),
    companyId: Joi.number(),
  }),
  query: Joi.object({
    limit: Joi.string(),
  }),
};

export const UserInfoUpdateRouteSchema = {
  body: Joi.object({
    address: Joi.object(),
    website: Joi.string(),
    languages: Joi.array(),
    serviceAreas: Joi.array(),
    socials: Joi.object(),
    aboutMe: Joi.string(),
    companyId: Joi.number(),
  }),
};

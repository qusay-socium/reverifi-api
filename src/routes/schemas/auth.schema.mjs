import Joi from 'joi';

export const AuthRouteSchemaLogin = {
  body: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().required(),
  }),
};

export const AuthRouteSchemaSignUp = {
  body: Joi.object({
    name: Joi.string(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().required(),
    phone: Joi.string(),
  }),
};

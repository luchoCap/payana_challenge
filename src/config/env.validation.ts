import * as Joi from 'joi';

export const EnvValidationSchema = Joi.object({
  PORT: Joi.number().required(),
  SCOPE: Joi.string().required(),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_LOGIN_EXPIRED_IN: Joi.string().required(),
});

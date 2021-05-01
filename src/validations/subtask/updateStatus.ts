import Joi from 'joi';

const updateStatus = (status: string) => {
  const schema = Joi.object({
    status: Joi.string().max(10).valid('pending', 'completed').required(),
  });

  const { error } = schema.validate({ status });

  return error?.details ?? false;
};

export default updateStatus;

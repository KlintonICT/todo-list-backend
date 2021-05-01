import Joi from 'joi';

const create = (title: string) => {
  const schema = Joi.object({
    title: Joi.string().max(500).required(),
  });

  const { error } = schema.validate({ title });

  return error?.details ?? false;
};

export default create;

import Joi from 'joi';

interface IObject {
  id: string;
  status: string;
}

const updateStatus = (obj: IObject) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    status: Joi.string().max(10).valid('pending', 'completed').required(),
  });

  const { error } = schema.validate(obj);

  return error?.details ?? false;
};

export default updateStatus;

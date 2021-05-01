import Joi from 'joi';

interface IObject {
  todo_id: string;
  title: string;
}

const create = (obj: IObject) => {
  const schema = Joi.object({
    todo_id: Joi.string().required(),
    title: Joi.string().max(500).required(),
  });

  const { error } = schema.validate(obj);

  return error?.details ?? false;
};

export default create;

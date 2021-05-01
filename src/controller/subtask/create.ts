import uuidV4 from '../../utils/uuidV4';
import prisma from '../../utils/prisma';
import subtaskValidation from '../../validations/subtask';

interface IReq {
  body: {
    todo_id: string;
    title: string;
  };
}

const create = async (req: IReq, res: any, _next: any) => {
  try {
    const { todo_id, title } = req.body;

    //  validate subtask input
    const validatedError = subtaskValidation.create(req.body);
    if (validatedError) {
      return res.status(422).json({
        message: 'Invalid todo title',
        error: validatedError,
      });
    }

    // find todo item
    const todo = await prisma.todo.findUnique({ where: { id: todo_id } });
    if (!todo) {
      return res.status(404).json({
        message: 'Your todo does not exist',
      });
    }

    // create new subtask for given todo
    const newSubTask = await prisma.subtask.create({
      data: {
        id: uuidV4(),
        title,
        todo_id,
      },
    });

    return res.status(200).json({
      message: 'Created subtask successfully',
      subtask: newSubTask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export default create;

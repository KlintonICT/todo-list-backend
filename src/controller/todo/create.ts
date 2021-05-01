import uuidV4 from '../../utils/uuidV4';
import prisma from '../../utils/prisma';
import todoValidation from '../../validations/todo';

interface IReq {
  body: {
    title: string;
  };
}

const create = async (req: IReq, res: any, _next: any) => {
  try {
    const { title } = req.body;

    //  validate todo title
    const validatedError = todoValidation.create(title);
    if (validatedError) {
      return res.status(422).json({
        message: 'Invalid todo title',
        error: validatedError,
      });
    }

    // create new todo
    const newTodo = await prisma.todo.create({
      data: {
        id: uuidV4(),
        title,
      },
    });

    return res.status(200).json({
      message: 'Created todo successfully',
      todo: newTodo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export default create;

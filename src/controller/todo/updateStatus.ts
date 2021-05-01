import prisma from '../../utils/prisma';
import todoValidation from '../../validations/todo';

interface IReq {
  body: {
    status: string;
  };
  params: {
    id: string;
  }
}

const create = async (req: IReq, res: any, _next: any) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    //  validate status
    const validatedError = todoValidation.updateStatus(status);
    if (validatedError) {
      return res.status(422).json({
        message: 'Invalid status',
        error: validatedError,
      });
    }

    // find todo item
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      return res.status(404).json({
        message: 'Your todo does not exist',
      });
    }

    // update todo status
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json({
      message: 'Updated todo successfully',
      todo: updatedTodo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export default create;

import prisma from '../../utils/prisma';

interface IReq {
  params: {
    id: string;
  };
}

const deleteTodo = async (req: IReq, res: any, _next: any) => {
  try {
    const { id } = req.params;

    // find todo item
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      return res.status(404).json({
        message: 'Your todo does not exist',
      });
    }

    // delete todo item
    await prisma.todo.delete({ where: { id } });

    return res.status(200).json({
      message: 'Deleted todo successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export default deleteTodo;

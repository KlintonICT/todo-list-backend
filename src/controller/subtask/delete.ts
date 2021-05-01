import prisma from '../../utils/prisma';

interface IReq {
  params: {
    id: string;
  };
}

const deleteTodo = async (req: IReq, res: any, _next: any) => {
  try {
    const { id } = req.params;

    // find subtask item
    const subtask = await prisma.subtask.findUnique({ where: { id } });
    if (!subtask) {
      return res.status(404).json({
        message: 'Your subtask does not exist',
      });
    }

    // delete subtask item
    await prisma.subtask.delete({ where: { id } });

    return res.status(200).json({
      message: 'Deleted subtask successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export default deleteTodo;

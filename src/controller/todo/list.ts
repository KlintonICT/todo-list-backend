import prisma from '../../utils/prisma';

const list = async (_req: any, res: any, _next: any) => {
  try {
    // create new todo
    const todoList = await prisma.todo.findMany({
      include: {
        subtasks: true,
      },
    });

    return res.status(200).json({
      message: 'Get todo list successfully',
      todoList,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export default list;

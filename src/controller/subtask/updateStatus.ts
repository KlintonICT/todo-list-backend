import prisma from '../../utils/prisma';
import subtaskValidation from '../../validations/subtask';
interface IReq {
  body: {
    status: string;
  };
  params: {
    id: string;
  };
}

const create = async (req: IReq, res: any, _next: any) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    //  validate status
    const validatedError = subtaskValidation.updateStatus(status);
    if (validatedError) {
      return res.status(422).json({
        message: 'Invalid status',
        error: validatedError,
      });
    }

    // find subtask item
    const subtask = await prisma.subtask.findUnique({ where: { id } });
    if (!subtask) {
      return res.status(404).json({
        message: 'Your subtask does not exist',
      });
    }

    // update subtask status
    const updatedSubtask = await prisma.subtask.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json({
      message: 'Updated subtask successfully',
      subtask: updatedSubtask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export default create;

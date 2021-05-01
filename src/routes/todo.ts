import express from 'express';
import todoController from '../controller/todo';

const router = express.Router();

/* CREATE new todo */
router.post('/', todoController.create);

/* GET todo list */
router.get('/', todoController.list);

/* UPDATE todo status */
router.patch('/:id', todoController.updateStatus);

/* DELETE todo by id */
router.delete('/:id', todoController.deleteTodo);

export default router;

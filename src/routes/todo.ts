import express from 'express';
import todoController from '../controller/todo';

const router = express.Router();

/* CREATE new todo */
router.post('/', todoController.create);

/* GET todo list */
router.get('/', todoController.list);

export default router;

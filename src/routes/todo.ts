import express from 'express';
import todoController from '../controller/todo';

const router = express.Router();

/* CREATE new todo */
router.post('/', todoController.create);

export default router;

import express from 'express';
import subtaskController from '../controller/subtask';

const router = express.Router();

/* CREATE new subtask for given todo */
router.post('/', subtaskController.create);

/* UPDATE subtask status */
router.patch('/', subtaskController.updateStatus);

export default router;

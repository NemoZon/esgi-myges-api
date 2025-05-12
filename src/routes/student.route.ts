import { Router } from 'express';
import studentController from '../controllers/student.controller';
import authMiddleware from '../middlewares/auth.middleware';

const studentRouter = Router();

studentRouter.get('/:userId', authMiddleware, studentController.getUserStudent);

export default studentRouter;

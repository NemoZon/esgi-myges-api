import { Router } from 'express';
import lessonController from '../controllers/lesson.controller';
import authMiddleware from '../middlewares/auth.middleware';

const lessonRouter = Router();

lessonRouter.get('/', authMiddleware, lessonController.getLessons);

export default lessonRouter;

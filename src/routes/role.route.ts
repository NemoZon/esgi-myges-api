import { Router } from 'express';
import roleController from '../controllers/role.controller';
import authMiddleware from '../middlewares/auth.middleware';

const roleRouter = Router();

roleRouter.get('/', authMiddleware, roleController.getRoles);

export default roleRouter;

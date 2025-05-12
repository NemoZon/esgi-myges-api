import { Router } from 'express';
import userController from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth.middleware';

const userRouter = Router();

userRouter.get('/', authMiddleware, userController.getUsers);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.post('/register', userController.register);
userRouter.post('/refresh', userController.refresh);

export default userRouter;

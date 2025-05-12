import { Router } from 'express';
import speakerController from '../controllers/speaker.controller';
import authMiddleware from '../middlewares/auth.middleware';

const speakerRouter = Router();

speakerRouter.get('/:userId', authMiddleware, speakerController.getUserSpeaker);

export default speakerRouter;

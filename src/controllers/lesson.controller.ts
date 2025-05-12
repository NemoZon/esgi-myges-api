import { Request, Response } from 'express';
import lessonService from '../services/lesson.service';

class LessonController {
  async getLessons(req: Request, res: Response): Promise<void> {
    try {
      const filter = req.query;
      const lessons = await lessonService.get(filter);
      res.status(200).json(lessons);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching lessons' });
    }
  }
}

const lessonController = new LessonController();
export default lessonController;

import { FilterQuery } from 'mongoose';
import lessonModel, { ILesson } from '../models/lesson.model';

class LessonService {
  async get(filter: FilterQuery<ILesson>): Promise<ILesson[]> {
    try {
      const lessons = await lessonModel.find(filter);
      return lessons;
    } catch (error) {
      console.error('Error fetching lessons:', error);
      throw error;
    }
  }
}

const lessonService = new LessonService();
export default lessonService;

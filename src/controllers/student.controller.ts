import { Request, Response } from 'express';
import studentService from '../services/student.service';

class StudentController {
  async getUserStudent(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.userId;
      const students = await studentService.get({ user: userId });
      if (students.length === 0) {
        res.status(404).json({ message: 'No students found for this user' });
        return;
      }
      res.status(200).json(students[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching students' });
    }
  }
}

const studentController = new StudentController();
export default studentController;

import { Document, FilterQuery } from 'mongoose';
import studentModel, { IStudent } from '../models/student.model';

class StudentService {
  async create(student: Omit<IStudent, '_id'>): Promise<IStudent & Document> {
    try {
      const newStudent = await studentModel.create(student);
      return newStudent;
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  }
  async get(filter: FilterQuery<IStudent>): Promise<IStudent[]> {
    try {
      const students = await studentModel.find(filter);
      return students;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  }
}

const studentService = new StudentService();
export default studentService;

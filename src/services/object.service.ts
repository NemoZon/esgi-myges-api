import { FilterQuery } from 'mongoose';
import objectModel, { IObject } from '../models/object.model';

class ObjectService {
  async create(object: Omit<IObject, '_id'>): Promise<IObject> {
    try {
      const newObject = await objectModel.create(object);
      return newObject;
    } catch (error) {
      console.error('Error creating object:', error);
      throw error;
    }
  }
  async get(filter: FilterQuery<IObject> = {}): Promise<IObject[]> {
    try {
      const objects = await objectModel.find(filter);
      return objects;
    } catch (error) {
      console.error('Error fetching objects:', error);
      throw error;
    }
  }
}

const objectService = new ObjectService();
export default objectService;

import { Document } from 'mongoose';
import permissionModel, { IPermission } from '../models/permission.model';

class PermissionService {
  async create(
    permission: Omit<IPermission, '_id'>
  ): Promise<IPermission & Document> {
    try {
      const newPermission = await permissionModel.create(permission);
      return newPermission;
    } catch (error) {
      console.error('Error creating permission:', error);
      throw error;
    }
  }
}

const permissionService = new PermissionService();
export default permissionService;

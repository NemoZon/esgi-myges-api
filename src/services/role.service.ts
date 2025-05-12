import { Document, FilterQuery } from 'mongoose';
import roleModel, { IRole, PopulatedRole } from '../models/role.model';
import { IPermission } from '../models/permission.model';

class RoleService {
  async create(role: Omit<IRole, '_id'>): Promise<IRole & Document> {
    try {
      const newRole = await roleModel.create(role);
      return newRole;
    } catch (error) {
      console.error('Error creating role:', error);
      throw error;
    }
  }
  async get(filter: FilterQuery<IRole> = {}): Promise<PopulatedRole[]> {
    try {
      const roles = await roleModel
        .find(filter)
        .populate<{ permissions: IPermission[] }>('permissions');
      return roles;
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  }
}

const roleService = new RoleService();
export default roleService;

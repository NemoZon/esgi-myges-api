import { Request, Response } from 'express';
import roleService from '../services/role.service';

class RoleController {
  async getRoles(req: Request, res: Response): Promise<void> {
    try {
      const filter = req.query;
      const roles = await roleService.get(filter);
      res.status(200).json(roles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching roles' });
    }
  }
}

const roleController = new RoleController();
export default roleController;

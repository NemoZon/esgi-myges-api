import { IRole } from '../models/role.model';
import { IUserPopulated } from '../models/user.model';

export default class UserDTO {
  id: string;
  email: string;
  roles: IRole[];

  constructor(model: IUserPopulated) {
    this.id = model._id.toString();
    this.email = model.email;
    this.roles = model.roles;
  }
}

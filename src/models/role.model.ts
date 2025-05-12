import { Schema, Types, model } from 'mongoose';
import { IPermission } from './permission.model';

export const ADMIN = 'Admin';
export const INVESTOR = 'Investor';
export const ROLES = [ADMIN, INVESTOR];

export interface IRole {
  _id: Types.ObjectId;
  roleTitle: string;
  permissions: Types.ObjectId[];
}

export type PopulatedRole = Omit<IRole, 'permissions'> & {
  permissions: IPermission[];
};

const RoleSchema = new Schema({
  roleTitle: {
    type: String,
    required: true,
    unique: true
  },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Permission',
      required: true
    }
  ]
});

export default model('Role', RoleSchema);

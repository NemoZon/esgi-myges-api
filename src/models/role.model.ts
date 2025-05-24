import { Schema, Types, model, Document } from 'mongoose';
import { IPermission } from './permission.model';

export const ADMIN = 'Admin';
export const INVESTOR = 'Investor';
export const ROLES = [ADMIN, INVESTOR] as const;

export type RoleTitle = (typeof ROLES)[number];

export interface IRole extends Document {
  roleTitle: string;
  permissions: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export type PopulatedRole = Omit<IRole, 'permissions'> & {
  permissions: IPermission[];
};

const RoleSchema = new Schema<IRole>(
  {
    roleTitle: {
      type: String,
      required: [true, 'Role title is required'],
      enum: ROLES,
      unique: true,
      trim: true
    },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Permission',
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);

RoleSchema.index({ roleTitle: 1 }, { unique: true });

export default model<IRole>('Role', RoleSchema);
